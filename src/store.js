import { configureStore } from "@reduxjs/toolkit";
import categoryreducer from "./redux/category/categorySlice";
import productreducer from "./redux/product/productSlice";
import cartReducer from "./redux/cart/cartSlice";

const store = configureStore({
  reducer: {
    category: categoryreducer,
    product: productreducer,
    cart: cartReducer,
  },
});

export default store;
