import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth_routes from "./routes/auth_routes.js";
import product_routes from "./routes/product_routes.js";
import category_routes from "./routes/category_routes.js";
import { connctDB } from "./config/db.js";
import jwt from "jsonwebtoken";

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,               
  })
);

app.use(express.json());
app.use(cookieParser());


connctDB();

app.use("/api", auth_routes);
app.use("/api/products", product_routes);
app.use("/api/categories", category_routes);


app.get("/api/me", (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.json({ user: null });

  try {
    const decoded = jwt.verify(token, "46@#$$%^46");
    return res.json({ user: { userid: decoded.userid, role: decoded.role } });
  } catch (err) {
    return res.json({ user: null });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));