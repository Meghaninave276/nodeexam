import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
} from "../controllers/category_conroller.js";

const router = express.Router();

// ✅ PUBLIC ROUTE
router.get("/", getCategories);

// 🔐 PROTECTED ROUTES (if needed later)
// router.post("/", protect, addCategory);
// router.delete("/:id", protect, deleteCategory);

router.post("/", addCategory);
router.delete("/:id", deleteCategory);

export default router;