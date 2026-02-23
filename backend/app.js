import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth_routes.js";
import productRoutes from "./routes/product_routes.js";
import categoryRoutes from "./routes/category_routes.js";



const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ❌ DO NOT USE protect globally

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

export default app;