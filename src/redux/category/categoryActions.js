import { toast } from "react-toastify";
import { getCategories } from "../../axios/categoryAxios";
import { setCategories } from "./categorySlice";

export const getCategoriesAction = () => async (dispatch) => {
  const result = await getCategories();

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setCategories(result.data));
};
