import mongoose from "mongoose";

// One entry per size within a gender+color variant
const sizeStockSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
    },
    sku: { type: String, unique: true, sparse: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false }, // no need for _id here, size is the identifier
);

// One entry per gender+color combination — holds images + all its sizes
const variantSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      enum: ["male", "female", "kids", "unisex"],
      required: true,
    },
    color: { type: String, required: true }, // e.g. "black", "crimson"
    images: {
      display: { type: String, required: true }, // main card image
      poses: [{ type: String }], // gallery images
    },
    sizes: [sizeStockSchema], // S/M/L/XL each with their own stock
  },
  { timestamps: true }, // _id kept — cart/wishlist reference variant._id
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: null },
    variants: [variantSchema],
    themeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productThemes",
      required: true,
    },
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productTypes",
      required: true,
    },
    tags: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { collection: "products", timestamps: true },
);

productSchema.index({ catId: 1, typeId: 1 });
productSchema.index({ tags: 1 });

const productModel = mongoose.model("products", productSchema);

export default productModel;
