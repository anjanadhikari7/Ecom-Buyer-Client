import { toast } from "react-toastify";
import { getProduct, getProducts } from "../../axios/productAxios";
import { setProduct, setProducts } from "./productSlice";

export const getProductsAction = () => async (dispatch) => {
  const result = await getProducts();

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setProducts(result.data));
};

export const getProductAction = (sku) => async (dispatch) => {
  const result = await getProduct(sku);

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setProduct(result.data));
};
