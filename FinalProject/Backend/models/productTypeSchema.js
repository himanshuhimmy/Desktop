import mongoose from "mongoose";

const productTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { collection: "productTypes", timestamps: true }, // createdAt, updatedAt
);

const productTypeModel = mongoose.model("productTypes", productTypeSchema);

export default productTypeModel;
