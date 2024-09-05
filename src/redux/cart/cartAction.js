import { setItems } from "./cartSlice";

export const addItemToCartAction = (item) => (dispatch) => {
  console.log("itemsAc", item);

  dispatch(setItems(item));
};


export const updateQuantityAction = (sku, edited) => (dispatch) => {


}
