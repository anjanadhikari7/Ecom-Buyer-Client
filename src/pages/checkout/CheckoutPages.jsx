import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../../components/Checkout/CheckOutForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Container, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_APP_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
      toast.warning("Please login first!");
      return;
    }
    if (items.length < 1) {
      navigate("/");
      toast.warning("Please select some items first!");
    }
  }, []);
  const totalAmount = items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
  };
  const totalAmountInDollar = totalAmount;
  //call api to create a payment Intent as soon as we

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_APP_API_BASE_URL}/create-payment-intent`, {
        amount: totalAmountInDollar * 100,
      })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);
  return (
    <Container>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <Stack
            gap={2}
            className=" d-flex align-items-center justify-content-center mt-5"
          >
            <CheckOutForm />
          </Stack>
        </Elements>
      )}
    </Container>
  );
};

export default CheckoutPage;
