import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckoutPage from "./pages/CheckoutPages";
import HomePage from "./pages/HomePage";
import LayoutPage from "./pages/LayoutPage";
import "./App.css";
import UserPage from "./pages/UserPage";
import AboutUsPage from "./components/About Us/AboutUs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/user:_id" element={<UserPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>

        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
