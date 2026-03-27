import express from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../controller/ordercontroller.js";

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);
router.patch("/:id/cancel", cancelOrder);

export default router;
