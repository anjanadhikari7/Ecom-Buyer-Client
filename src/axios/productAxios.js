import { axiosApiCall } from "./axiosHelper";
// Product API URL

const PRODUCT_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/product`;

// PUBLIC Route

// Get all products

export const getProducts = () => {
  return axiosApiCall({
    method: "get",
    url: PRODUCT_API_URL,
  });
};
