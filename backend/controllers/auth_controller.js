import { usercollection } from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  const userExists = await usercollection.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await usercollection.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json({ message: "User Registered" });
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  const user = await usercollection.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id },
    "4563285@#$%%^@#$",
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "lax",
  });

  res.json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

export const logout = (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.json({ message: "Logged Out" });
};