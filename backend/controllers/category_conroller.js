import { categorycollection } from "../models/category_model.js";

// Add category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ status: 400, message: "Name required" });

    const category = await categorycollection.create({ name });
    res.json({ status: 200, message: "Category created", category });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

// Get all categories
export const getCategory = async (req, res) => {
  try {
    const categories = await categorycollection.find();
    res.json({ status: 200, message: "Categories fetched", categories });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ status: 400, message: "ID required" });

    await categorycollection.findByIdAndDelete(id);
    res.json({ status: 200, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};