import { Router } from "express";
import User from "../models/userModel.js";
import auth from "../middleware/auth.js";

const router = Router();

//! GET /api/users  — all active users (any authenticated user can call this)
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find({ isActive: true }).select("name email userType").sort({ name: 1 });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
