import express from "express";
import {
  getAllProductTypes,
  getProductTypeById,
  createProductType,
  updateProductType,
  deleteProductType,
} from "../controller/productTypeController.js";
import { requireAdmin } from "../middleware/authmiddleware.js";

const router = express.Router();

// Public read routes
router.get("/", getAllProductTypes);
router.get("/:id", getProductTypeById);

// Admin-only write routes
router.post("/", requireAdmin, createProductType);
router.put("/:id", requireAdmin, updateProductType);
router.delete("/:id", requireAdmin, deleteProductType);

export default router;
