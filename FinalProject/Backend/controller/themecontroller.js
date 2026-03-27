import productThemeModel from "../models/productThemeSchema.js";

//! GET /api/themes  (public)
export const getAllThemes = async (req, res) => {
  try {
    const themes = await productThemeModel
      .find({ isActive: true })
      .sort({ name: 1 });
    res.status(200).json({ themes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! POST /api/themes  (admin)
export const createTheme = async (req, res) => {
  try {
    const theme = await productThemeModel.create(req.body);
    res.status(201).json({ theme });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PUT /api/themes/:id  (admin)
export const updateTheme = async (req, res) => {
  try {
    const theme = await productThemeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!theme) return res.status(404).json({ message: "Theme not found" });
    res.status(200).json({ theme });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! DELETE /api/themes/:id  (admin)
export const deleteTheme = async (req, res) => {
  try {
    await productThemeModel.findByIdAndUpdate(req.params.id, {
      isActive: false,
    });
    res.status(200).json({ message: "Theme deactivated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
