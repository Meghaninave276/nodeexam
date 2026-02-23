import axiosInstance from "../utils/axiosConfig.js";

export const getAllProducts = () =>
  axiosInstance.get("/products");

export const getMyProducts = () =>
  axiosInstance.get("/products/my");

export const addProduct = (data) =>
  axiosInstance.post("/products", data);
export const updateProduct = (id, data) =>
  axios.put(`/products/${id}`, data);

export const deleteProduct = (id) =>
  axiosInstance.delete(`/products/${id}`);