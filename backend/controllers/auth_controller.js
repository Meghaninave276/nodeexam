import { usercollection } from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signup = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await usercollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ status: 400, message: "User already exists" });
    }

    const hashpass = await bcrypt.hash(password, 12);
    const user = await usercollection.create({ username, password: hashpass, role });

    return res.status(200).json({ status: 200, message: "User signup successfully", user });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usercollection.findOne({ username });
    if (!user) {
      return res.status(400).json({ status: 400, message: "User not found" });
    }

    const ispassmatch = await bcrypt.compare(password, user.password);
    if (!ispassmatch) {
      return res.status(400).json({ status: 400, message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { userid: user._id, role: user.role },
      "46@#$$%^46",
      { expiresIn: "1h" }
    );

 
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax", 
      maxAge: 60 * 60 * 1000, 
    });

    return res.status(200).json({ status: 200, message: "User signin successfully", user: { username: user.username, role: user.role } });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};


export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ status: 200, message: "Logged out successfully" });
};