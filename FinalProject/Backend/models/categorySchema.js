import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    isActive: { type: Boolean, default: true },
  },
  { collection: "categories", timestamps: true }, // createdAt, updatedAt
);

categorySchema.index({ slug: 1 });

const categoryModel = mongoose.model("categories", categorySchema);

export default categoryModel;
