import jwt from "jsonwebtoken";

const generateToken = (res, user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    "4562$%^#@#$$",
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax", 
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;