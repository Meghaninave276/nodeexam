import express from "express";
import {  renderEditForm,createProduct, updateProduct, deleteProduct, getAllProducts, getMyProducts } from "../controllers/product_controller.js";
import { requireAuth } from "../middlewares/auth_middleware.js";



const router = express.Router();

router.get("/", getAllProducts);
router.get("/my", requireAuth,getMyProducts );
router.get("/add", requireAuth, renderEditForm);
router.post("/add", requireAuth, createProduct);
router.get("/edit/:id", requireAuth, renderEditForm);
router.post("/edit/:id", requireAuth, updateProduct);
router.get("/delete/:id", requireAuth, deleteProduct);

export default router;