import { configureStore } from "@reduxjs/toolkit";
import categoryreducer from "./redux/category/categorySlice";
import productreducer from "./redux/product/productSlice";

const store = configureStore({
  reducer: {
    category: categoryreducer,
    product: productreducer,
  },
});

export default store;
