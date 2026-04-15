import bcrypt from "bcrypt";
import User from "../models/userModel.js";

//! POST /api/admin/users  — create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "name, email, and password are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      userType: userType || "user",
    });

    res.status(201).json({
      message: "User created",
      user: { id: user._id, name: user.name, email: user.email, userType: user.userType },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/admin/users  — list all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PATCH /api/admin/users/:id/status  — toggle active/inactive
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isActive = !user.isActive;
    await user.save();

    res.json({ message: `User ${user.isActive ? "activated" : "deactivated"}`, isActive: user.isActive });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PATCH /api/admin/users/:id  — update user info
export const updateUser = async (req, res) => {
  try {
    const { name, email, userType } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, userType },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
