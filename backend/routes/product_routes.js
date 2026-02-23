import express from "express";
import { protect } from "../middlewares/auth_middleware.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  updateProduct,
} from "../controllers/product_controller.js";

const router = express.Router();

// ✅ PUBLIC
router.get("/", getAllProducts);

// 🔐 PROTECTED
router.get("/my", protect, getMyProducts);
router.post("/", protect, addProduct);
router.delete("/:id", protect, deleteProduct);
router.put("/:id", protect, updateProduct);

export default router;