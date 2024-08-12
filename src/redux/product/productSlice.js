import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

const { reducer: productreducer, actions } = productSlice;

export const { setProducts, setProduct } = actions;

export default productreducer;
