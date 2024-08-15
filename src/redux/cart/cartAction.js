import { setTotalQuantity } from "./cartSlice";

export const addToCartAction =
  (product, items, totalQuantity) => (dispatch) => {
    const existingItem = items.find((item) => item._id === product._id);
    if (existingItem) {
    } else {
      totalQuantity = totalQuantity + 1;

      dispatch(setTotalQuantity(totalQuantity));
    }
  };
