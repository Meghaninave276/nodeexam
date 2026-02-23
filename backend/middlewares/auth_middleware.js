import jwt from "jsonwebtoken";
import { usercollection } from "../models/user_model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, "4563285@#$%%^@#$");

    req.user = await usercollection.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};