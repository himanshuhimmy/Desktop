import bcrypt from "bcrypt";
import userModel from "../models/userSchema.js";

//! POST /api/auth/register
export const register = async (req, resp) => {
  try {
    const { name, email, password } = req.body;

    const existing = await userModel.findOne({ email });
    if (existing)
      return resp.status(400).json({ message: "Email already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    resp.status(201).json({
      message: "Registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    resp.status(500).json({ message: err.message });
  }
};

//! POST /api/auth/login
export const login = async (req, resp) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user)
      return resp.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return resp.status(401).json({ message: "Invalid email or password" });

    if (!user.isActive)
      return resp.status(403).json({ message: "Account is deactivated" });

    user.lastLoginAt = new Date();
    await user.save();

    resp.status(200).json({
      message: "Logged in successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    resp.status(500).json({ message: err.message });
  }
};

//!! GET /api/auth/me?userId=abc123
export const getMe = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const user = await userModel
      .findById(userId)
      .select("-password")
      .populate("planId");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
