import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);

const BecomePro = () => {
 return (
  <div>
   <h1 className="capitalize text-yellow-500 font-semibold my-10 text-center">10$ Will be Charged To be A pro User</h1>
   <div>
    <Elements stripe={stripePromise}>
     <CheckOutForm></CheckOutForm>
    </Elements>
   </div>
  </div>
 );
};

export default BecomePro;
