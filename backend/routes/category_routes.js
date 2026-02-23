import express from "express";

import { requireAdmin, requireAuth } from "../middlewares/auth_middleware.js";
import { addCategory, deleteCategory, getCategory } from "../controllers/category_conroller.js";



const router = express.Router();

router.get("/", getCategory);
router.post("/add", requireAuth, requireAdmin, addCategory);
router.get("/delete/:id", requireAuth, requireAdmin, deleteCategory);

export default router;