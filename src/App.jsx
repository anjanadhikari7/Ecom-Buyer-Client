import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LayoutPage from "./pages/LayoutPage";
import SignupPage from "./pages/authPage/SignupPage";
import LoginPage from "./pages/authPage/LoginPage";
import HomePage from "./pages/homepage/HomePage";
import ShopProducts from "./pages/Shop/ShopProduct";
import ProductPage from "./pages/checkout/ProductPage";
import UserPage from "./pages/User/UserPage";
import CartPage from "./pages/CartPage/CartPage";
import AboutUsPage from "./pages/About Us/AboutUs";
import CheckoutPage from "./pages/checkout/CheckoutPages";
import PaymentSuccessPage from "./pages/checkout/PaymentSuccessPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/verify-email" element={<VerifyEmailPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/reset-password" element={<ResetEmailPage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopProducts />} />
          <Route path="/product/:sku" element={<ProductPage />} />
          <Route path="/user:_id" element={<UserPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>

        <Route path="/payment-success" element={<PaymentSuccessPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
