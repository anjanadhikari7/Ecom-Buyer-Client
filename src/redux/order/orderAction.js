import { toast } from "react-toastify";
import { setIsLoading, setOrders } from "./orderSlice";
import { createOrders, getOrders } from "../../axios/orderAxios";
import { setItems, setTotalQuantity } from "../cart/cartSlice";

// GET ALL Orders
export const getOrdersAction = (userId) => async (dispatch) => {
  console.log("UserId", userId);
  const result = await getOrders(userId);

  if (result?.status === "error") {
    return toast.error(result.message);
  }
  console.log(result.data);

  dispatch(setOrders(result.data));
};

// Create Orders

// CREATE A PRODUCT
export const createOrderAction = (orderObj) => async (dispatch) => {
  //set isCreating true
  dispatch(setIsLoading(true));
  // call create category API
  const result = await createOrders(orderObj);
  // set isCreating false
  dispatch(setIsLoading(false));

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);
  dispatch(setItems([]));
  dispatch(setTotalQuantity(0));

  dispatch(getOrdersAction(orderObj.userId));
};
