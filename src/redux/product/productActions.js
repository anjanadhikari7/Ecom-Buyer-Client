import { getProducts } from "../../axios/productAxios";
import { setProducts } from "./productSlice";

export const getProductsAction = () => async (dispatch) => {
  const result = await getProducts();

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setProducts(result.data));
};
