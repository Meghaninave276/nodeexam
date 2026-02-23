import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, "46@#$$%^46");
    req.user = decoded; // { userid, role }
    next();
  } catch {
    res.redirect("/login");
  }
};

// Admin-only routes
export const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).send("Forbidden");
  next();
};