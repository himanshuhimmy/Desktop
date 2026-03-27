import categoryModel from "../models/categorySchema.js";
import productTypeModel from "../models/productTypeSchema.js";

// GET /api/categories  (public)
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel
      .find({ isActive: true })
      .sort({ name: 1 });
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/categories/:id/types  (public)
export const getTypesByCategory = async (req, res) => {
  try {
    const types = await productTypeModel.find({
      catId: req.params.id,
      isActive: true,
    });
    res.status(200).json({ types });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/categories  (admin)
export const createCategory = async (req, res) => {
  try {
    const category = await categoryModel.create(req.body);
    res.status(201).json({ category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/categories/:id  (admin)
export const updateCategory = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/categories/:id  (admin)
export const deleteCategory = async (req, res) => {
  try {
    await categoryModel.findByIdAndUpdate(req.params.id, { isActive: false });
    res.status(200).json({ message: "Category deactivated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
