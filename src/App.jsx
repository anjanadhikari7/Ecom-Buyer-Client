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
import ProductPage from "./pages/ProductPage";
import ShopProducts from "./pages/ShopProduct";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./components/CartPage/CartPage";

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
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
