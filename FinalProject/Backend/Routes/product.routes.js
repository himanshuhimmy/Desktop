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

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/:id/variants", getProductVariants);

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.patch("/:id/status", toggleProductStatus);
router.delete("/:id", deleteProduct);

router.post("/:id/variants", addVariant);
router.delete("/:id/variants/:variantId", deleteVariant);

// ← new: size is part of the URL now
router.patch("/:id/variants/:variantId/sizes/:size/stock", updateSizeStock);

export default router;
