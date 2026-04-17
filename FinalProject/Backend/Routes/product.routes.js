import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductVariants,
  createProduct,
  updateProduct,
  toggleProductStatus,
  deleteProduct,
  addVariant,
  deleteVariant,
  updateSizeStock, // ← renamed
} from "../controller/productcontroller.js";
import { requireAdmin } from "../middleware/authmiddleware.js";
const router = express.Router();

// Public read routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/:id/variants", getProductVariants);

// Admin-only write routes
router.post("/", requireAdmin, createProduct);
router.put("/:id", requireAdmin, updateProduct);
router.patch("/:id/status", requireAdmin, toggleProductStatus);
router.delete("/:id", requireAdmin, deleteProduct);

router.post("/:id/variants", requireAdmin, addVariant);
router.delete("/:id/variants/:variantId", requireAdmin, deleteVariant);
router.patch("/:id/variants/:variantId/sizes/:size/stock", requireAdmin, updateSizeStock);

export default router;
