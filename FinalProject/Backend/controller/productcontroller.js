import productModel from "../models/productSchema.js";

//! GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const { theme, cat, type, tag } = req.query;
    const filter = { isActive: true };

    if (theme) filter.themeId = theme;
    if (cat) filter.catId = cat;
    if (type) filter.typeId = type;
    if (tag) filter.tags = tag;

    const products = await productModel
      .find(filter)
      .populate("themeId", "name")
      .populate("catId", "name slug")
      .populate("typeId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ products, total: products.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("themeId", "name isExclusive")
      .populate("catId", "name slug")
      .populate("typeId", "name");

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/products/:id/variants
export const getProductVariants = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .select("variants");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ variants: product.variants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! POST /api/products
export const createProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PATCH /api/products/:id/status
export const toggleProductStatus = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json({ isActive: product.isActive });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndUpdate(req.params.id, { isActive: false });
    res.status(200).json({ message: "Product deactivated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! POST /api/products/:id/variants
//? Body: { gender, color, images: { display, poses[] }, sizes: [{ size, sku, stock }] }
export const addVariant = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.variants.push(req.body);
    await product.save();

    res.status(201).json({ variants: product.variants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! DELETE /api/products/:id/variants/:variantId
export const deleteVariant = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.variants = product.variants.filter(
      (v) => v._id.toString() !== req.params.variantId,
    );
    await product.save();

    res.status(200).json({ variants: product.variants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PATCH /api/products/:id/variants/:variantId/sizes/:size/stock
//? Body: { stock }
//? e.g. PATCH /api/products/abc/variants/def/sizes/M/stock  { "stock": 25 }
export const updateSizeStock = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const variant = product.variants.id(req.params.variantId);
    if (!variant) return res.status(404).json({ message: "Variant not found" });

    const sizeEntry = variant.sizes.find((s) => s.size === req.params.size);
    if (!sizeEntry) return res.status(404).json({ message: "Size not found" });

    sizeEntry.stock = req.body.stock;
    await product.save();

    res.status(200).json({ variant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
