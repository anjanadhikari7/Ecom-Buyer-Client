import { configureStore } from "@reduxjs/toolkit";
import categoryreducer from "./redux/category/categorySlice";
import productreducer from "./redux/product/productSlice";
import cartReducer from "./redux/cart/cartSlice";
import userReducer from "./redux/user/userSlice";
import orderreducer from "./redux/order/orderSlice";

const store = configureStore({
  reducer: {
    category: categoryreducer,
    product: productreducer,
    cart: cartReducer,
    user: userReducer,
    order: orderreducer,
  },
});

export default store;
