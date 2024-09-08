import { toast } from "react-toastify";
import {
  getNewAccessJwt,
  getUser,
  logoutUser,
  requestOTP,
  updateUser,
  verifyOTP,
} from "../../axios/userAxios";
import { setIsLoading, setUser } from "./userSlice";
import { setItems, setTotalQuantity } from "../cart/cartSlice";

export const getUserAction = () => async (dispatch) => {
  const result = await getUser();

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setUser(result.data));
};

// AUTo LOgin

export const autoLoginAction = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  if (!accessJWT && refreshJWT) {
    const result = await getNewAccessJwt();

    if (result?.status === "success") {
      sessionStorage.setItem("accessJWT", result.data);
      dispatch(getUserAction());
    }
  }

  // check if we have access token and if yes, dispatch get user action
  dispatch(getUserAction());
};

// Logout User
export const logoutUserAction = (email) => async (dispatch) => {
  // call api to delete session and update user's refesh token
  const result = await logoutUser(email);

  if (result?.status === "success") {
    // remove tokens from storage
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("refreshJWT");

    // clear state
    dispatch(setUser({}));
    dispatch(setItems([]));
    dispatch(setTotalQuantity(0));
    return toast.success(result.message);
  }

  return toast.error(result.message);
};

// Reset Password

export const otpAction = (email) => async (dispatch) => {
  const result = await requestOTP(email);
  console.log(result.status);
  if (result?.status === "success") {
    console.log("successss");
    return toast.success(result.message);
  }
  return toast.error(result.message);
};

export const verifyUserAction = (otp) => async (dispatch) => {
  const result = await verifyOTP(otp);

  if (result?.status === "success") {
    dispatch(setUser(result.data));
    console.log(result.data);
    return toast.success(result.message);
  }
  return toast.error(result.message);
};

// Update User

export const updateUserAction = (User) => async (dispatch) => {
  //set isCreating true
  dispatch(setIsLoading(true));
  // call updaet user API
  const result = await updateUser(User);
  // set isCreating false
  dispatch(setIsLoading(false));

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);

  dispatch(getUserAction());
  return { success: true };
};
