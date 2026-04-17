import express from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../controller/ordercontroller.js";
import { requireAuth, requireAdmin } from "../middleware/authmiddleware.js";

const router = express.Router();

router.use(requireAuth); // protects all order routes for users
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/:id/status", requireAdmin, updateOrderStatus);
router.patch("/:id/cancel", cancelOrder);

export default router;
