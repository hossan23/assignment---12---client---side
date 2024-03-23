// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckOutForm from "./CheckOutForm";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import Swal from "sweetalert2";

// const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_pk);

const BecomePro = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const handlePay = () => {
    axiosPublic
      .patch(`/users/${user?.email}`, { role: "pro-user" })
      .then((res) => {
        console.log(res.data);
        Swal.fire("You are a Pro User now!");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      <h1 className="capitalize font-semibold my-4 text-center sm:text-xl">
        you will be charged <span className="text-success">10$</span> to be A
        pro user
      </h1>
      <div>
        {/* <Elements stripe={stripePromise}>
          <CheckOutForm></CheckOutForm>
        </Elements> */}
        <div className="text-center">
          <button className="btn btn-accent" onClick={handlePay}>
            PAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default BecomePro;
