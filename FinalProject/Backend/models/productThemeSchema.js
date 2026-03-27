import mongoose from "mongoose";

const productThemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    isExclusive: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { collection: "productThemes", timestamps: true }, // createdAt, updatedAt
);

const productThemeModel = mongoose.model("productThemes", productThemeSchema);

export default productThemeModel;
