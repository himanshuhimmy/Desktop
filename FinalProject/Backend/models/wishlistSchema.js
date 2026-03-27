import mongoose from "mongoose";

// Each item stores the specific variant (size + color) the user wishlisted —
// not just the top-level product. This lets you show the exact variant and
// check its stock when the user revisits their wishlist.
// addedAt per-item enables "sort by recently added".

const wishlistItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId, // points to product.variants._id
      required: true,
    },
    themeId: { type: mongoose.Schema.Types.ObjectId, ref: "productThemes" }, // Individual theme
    size: String,
    addedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true, // one wishlist document per user
    },
    items: [wishlistItemSchema],
  },
  { collection: "wishlists", timestamps: true }, // createdAt, updatedAt
);

wishlistSchema.index({ userId: 1 });

const wishlistModel = mongoose.model("wishlists", wishlistSchema);

export default wishlistModel;
