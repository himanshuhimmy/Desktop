import bcrypt from "bcrypt";
import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";

//! POST /api/auth/register
export const register = async (req, resp) => {
  try {
    const { name, email, password, planId, isActive } = req.body;
    console.log(req.body);
    const existing = await userModel.findOne({ email });
    if (existing)
      return resp.status(400).json({ message: "Email already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      planId,
      isActive,
    });

    resp.status(201).json({
      message: "Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        planId: user.planId,
      },
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

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    resp.cookie("token", token, {
      httpOnly: true, // JS cannot read this cookie
      secure: false, // set true in production (HTTPS)
      sameSite: "lax", // protects against CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });
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

export const logout = async (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  res.status(200).json({ message: "Logged out successfully" });
};
