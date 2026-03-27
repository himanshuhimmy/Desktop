import bcrypt from "bcrypt";
import userModel from "../models/userSchema.js";
import mongoose from "mongoose";

//! GET /api/users
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      userModel
        .find()
        .select("-password")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      userModel.countDocuments(),
    ]);

    res
      .status(200)
      .json({ users, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ! GET by id       /api/users/:id
export const getUserById = async (req, resp) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .select("-password")
      .populate("planId");
    if (!user) return resp.status(404).json({ message: "User not found" });

    resp.status(200).json({ user });
  } catch (err) {
    resp.status(500).json({ message: err.message });
  }
};

// ! PATCH (update)    /api/users/:id
export const updateUser = async (req, resp) => {
  try {
    const allowed = ["name", "phone"];
    const updates = {};
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    let user = await userModel
      .findByIdAndUpdate(req.params.id, updates, { new: true })
      .select("-password");

    if (!user) return resp.status(404).json({ message: "User not found" });
    resp.status(200).json({ user });
  } catch (err) {
    resp.status(500).json({ message: err.message });
  }
};

//! PATCH /api/users/:id/password
//? Body: { currentPassword, newPassword }
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//!  DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.params.id, { isActive: false });
    res.status(200).json({ message: "User deactivated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
