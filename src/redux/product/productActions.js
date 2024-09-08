import { toast } from "react-toastify";
import {
  getProduct,
  getProducts,
  updateProduct,
} from "../../axios/productAxios";
import { setProduct, setProducts } from "./productSlice";
import { setIsLoading } from "../user/userSlice";

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

// UPDATE A PRODUCT
export const updateProductAction = (productObj) => async (dispatch) => {
  //set isCreating true
  dispatch(setIsLoading(true));
  // call create category API
  const result = await updateProduct(productObj);
  // set isCreating false
  dispatch(setIsLoading(false));

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);
  dispatch(getProductsAction());
};
