import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../firebase/AuthProvider';
import Swal from 'sweetalert2';

const CheckOutForm = () => {
 const { user } = useContext(AuthContext);
 const [error, setError] = useState('');
 const [clientSecret, setClientSecret] = useState('');
 const [transactionId, setTransactionId] = useState('');
 const stripe = useStripe();
 const elements = useElements();
 const axiosPublic = useAxiosPublic();
 const price = 10;

 useEffect(() => {
  axiosPublic
   .post('/create-payment-intent', { price: price })
   .then(res => {
    console.log(res.data.clientSecret);
    setClientSecret(res.data.clientSecret);
   })
   .catch(err => console.log(err.message));
 }, [axiosPublic, user]);

 const handleSubmit = async event => {
  event.preventDefault();

  if (!stripe || !elements) {
   return;
  }

  const card = elements.getElement(CardElement);

  if (card == null) {
   return;
  }

  const { error, paymentMethod } = await stripe.createPaymentMethod({
   type: 'card',
   card,
  });

  if (error) {
   console.log('payment error', error);
   setError(error.message);
  } else {
   console.log('Payment-Method', paymentMethod);
   setError('');
  }

  const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
   payment_method: {
    card: card,
    billing_details: {
     email: user?.email || 'anonymous',
     name: user?.displayName || 'anonymous',
    },
   },
  });

  if (confirmError) {
   console.log('confirmError', confirmError);
  } else {
   console.log('paymentIntent', paymentIntent);
   if (paymentIntent.status === 'succeeded') {
    console.log('transaction id', paymentIntent.id);
    setTransactionId(paymentIntent.id);
    Swal.fire('Payment Successful! You are A Pro-User Now');

    axiosPublic
     .patch(`/users/${user.email}`, { role: 'pro-user' })
     .then(res => console.log(res.data))
     .catch(err => console.log(err.message));
   }
  }
 };

 return (
  <form onSubmit={handleSubmit}>
   <CardElement
    options={{
     style: {
      base: {
       fontSize: '16px',
       color: '#424770',
       '::placeholder': {
        color: '#aab7c4',
       },
      },
      invalid: {
       color: '#9e2146',
      },
     },
    }}
   />
   <button type="submit" disabled={!stripe || !clientSecret}>
    Pay
   </button>
   <p className="text-red-400">{error}</p>
   {transactionId && <p className="text-green-400">Your Transaction id: {transactionId}</p>}
  </form>
 );
};

export default CheckOutForm;
