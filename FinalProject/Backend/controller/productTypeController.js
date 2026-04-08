import productTypeModel from "../models/productTypeSchema.js";

// GET /api/producttypes
export const getAllProductTypes = async (req, res) => {
  try {
    const types = await productTypeModel
      .find({ isActive: true })
      .populate("catId", "name slug")
      .sort({ name: 1 });
    res.status(200).json({ types });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/producttypes/:id
export const getProductTypeById = async (req, res) => {
  try {
    const type = await productTypeModel
      .findById(req.params.id)
      .populate("catId", "name slug");
    if (!type)
      return res.status(404).json({ message: "Product type not found" });
    res.status(200).json({ type });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/producttypes
// Body: { name, catId }
export const createProductType = async (req, res) => {
  try {
    const type = await productTypeModel.create(req.body);
    res.status(201).json({ type });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/producttypes/:id
export const updateProductType = async (req, res) => {
  try {
    const type = await productTypeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!type)
      return res.status(404).json({ message: "Product type not found" });
    res.status(200).json({ type });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/producttypes/:id
export const deleteProductType = async (req, res) => {
  try {
    await productTypeModel.findByIdAndUpdate(req.params.id, {
      isActive: false,
    });
    res.status(200).json({ message: "Product type deactivated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
