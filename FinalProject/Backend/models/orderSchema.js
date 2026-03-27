import mongoose from "mongoose";
import addressSchema from "./addressSchema.js";

// Embedded sub-schema — _id: false because items are never queried standalone.
const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    variantId: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true, min: 1 },
    priceAtPurchase: { type: Number, required: true }, // price snapshot
    nameAtPurchase: { type: String, required: true }, // product name snapshot
    variantSnapshot: {
      // variant details snapshot
      gender: String,
      size: String,
      color: String,
      sku: String,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: { ...addressSchema.obj }, // snapshot — not a live ref
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],
      default: "pending",
    },
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    paymentMethod: { type: String },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    placedAt: { type: Date, default: Date.now },
    deliveredAt: { type: Date },
    notes: { type: String },
  },
  { collection: "orders", timestamps: true }, // createdAt, updatedAt
);

orderSchema.index({ userId: 1, status: 1 });
orderSchema.index({ placedAt: -1 });

const orderModel = mongoose.model("orders", orderSchema);

export default orderModel;
