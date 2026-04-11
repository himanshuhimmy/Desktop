import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import adminModel from "../models/adminSchema.js";
import userModel from "../models/userSchema.js";
import orderModel from "../models/orderSchema.js";
import productModel from "../models/productSchema.js";
import dotenv from "dotenv";
dotenv.config();

const createAdminToken = (admin) =>
  jwt.sign(
    { adminId: admin._id, username: admin.username, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

//! POST /api/admin/login  (public)
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await adminModel.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    if (!admin.isActive)
      return res.status(403).json({ message: "Account deactivated" });

    const token = createAdminToken(admin);

    res.status(200).json({
      token,
      admin: { id: admin._id, username: admin.username, role: admin.role },
    });
  } catch (err) {
    console.log("Error:", err.message);
    console.log("Request body:", req.body);
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/admin/admins  (admin)
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find().select("-password");
    res.status(200).json({ admins });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! POST /api/admin/admins  (admin — superadmin only)
export const createAdmin = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const admin = await adminModel.create({ username, password: hashed, role });
    res.status(201).json({
      admin: { id: admin._id, username: admin.username, role: admin.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PATCH /api/admin/admins/:id  (admin)
export const updateAdmin = async (req, res) => {
  try {
    const updates = {};
    if (req.body.role) updates.role = req.body.role;
    if (req.body.password)
      updates.password = await bcrypt.hash(req.body.password, 10);

    const admin = await adminModel
      .findByIdAndUpdate(req.params.id, updates, { new: true })
      .select("-password");

    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json({ admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! DELETE /api/admin/admins/:id  (admin)
export const deleteAdmin = async (req, res) => {
  try {
    await adminModel.findByIdAndUpdate(req.params.id, { isActive: false });
    res.status(200).json({ message: "Admin deactivated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/admin/dashboard  (admin)
//? Returns a quick summary of key numbers
export const getDashboard = async (req, res) => {
  try {
    const [totalUsers, totalOrders, totalProducts, recentOrders] =
      await Promise.all([
        userModel.countDocuments(),
        orderModel.countDocuments(),
        productModel.countDocuments({ isActive: true }),
        orderModel
          .find()
          .sort({ placedAt: -1 })
          .limit(10)
          .populate("userId", "name email"),
      ]);

    // Total revenue from all paid orders
    const revenueResult = await orderModel.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = revenueResult[0]?.total ?? 0;

    res.status(200).json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
      recentOrders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
