import { categorycollection } from "../models/category_model.js";

export const addCategory = async (req, res) => {
  const category = await categorycollection.create(req.body);
  res.status(201).json(category);
};

export const getCategories = async (req, res) => {
  const categories = await categorycollection.find();
  res.json(categories);
};

export const deleteCategory = async (req, res) => {
  await categorycollection.findByIdAndDelete(req.params.id);
  res.json({ message: "Category Deleted" });
};