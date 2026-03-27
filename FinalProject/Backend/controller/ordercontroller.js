import orderModel from "../models/orderSchema.js";

const getUserId = (req) => req.body.userId || req.query.userId;

//! GET /api/orders?userId=abc123   (pass userId to filter by user, omit to get all)
export const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const userId = getUserId(req);
    const filter = userId ? { userId } : {};

    const [orders, total] = await Promise.all([
      orderModel
        .find(filter)
        .populate("userId", "name email")
        .skip(skip)
        .limit(limit)
        .sort({ placedAt: -1 }),
      orderModel.countDocuments(filter),
    ]);

    res
      .status(200)
      .json({ orders, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("userId", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PATCH /api/orders/:id/status
//? Body: { status }
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await orderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    if (status === "delivered") order.deliveredAt = new Date();
    await order.save();

    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PATCH /api/orders/:id/cancel
//? Body: { userId }
export const cancelOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const cancellable = ["pending", "confirmed"];
    if (!cancellable.includes(order.status)) {
      return res
        .status(400)
        .json({ message: `Cannot cancel a ${order.status} order` });
    }

    order.status = "cancelled";
    await order.save();
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
