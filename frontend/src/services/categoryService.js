import axios from "../utils/axiosConfig";

export const getCategories = () =>
  axios.get("/categories");

export const addCategory = (data) =>
  axios.post("/categories", data);

export const deleteCategory = (id) =>
  axios.delete(`/categories/${id}`);