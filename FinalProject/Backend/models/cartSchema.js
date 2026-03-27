import mongoose from "mongoose";

// Lifecycle flags:
//   isDeleted  — user manually cleared the cart (soft delete, data preserved)
//   isOrdered  — cart was converted to an Order at checkout (immutable after this)
//   deletedAt  — timestamp when the user cleared it
//   orderedAt  — timestamp when checkout completed
//   orderId    — the Order document this cart produced
//
// Query for a user's active cart:
//   Cart.findOne({ userId, isDeleted: false, isOrdered: false })
//
// Rule: once isOrdered = true, never mutate the cart — open a new one instead.

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    size: { type: String, required: true },
    variantId: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: [cartItemSchema],
    couponCode: { type: String, default: null },

    // ── checkout flag ─────────────────────────────────────────────────────────
    isOrdered: { type: Boolean, default: false },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      default: null, // populated when isOrdered flips to true
    },
    orderedAt: { type: Date, default: null },

    // ── soft-delete flag ──────────────────────────────────────────────────────
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { collection: "carts", timestamps: true }, // createdAt, updatedAt
);

// Efficient active-cart lookup
cartSchema.index({ userId: 1, isDeleted: 1, isOrdered: 1 });

const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;
