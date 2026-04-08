import express from "express";
import {
  getAllProductTypes,
  getProductTypeById,
  createProductType,
  updateProductType,
  deleteProductType,
} from "../controller/productTypeController.js";

const router = express.Router();

router.get("/", getAllProductTypes);
router.get("/:id", getProductTypeById);
router.post("/", createProductType);
router.put("/:id", updateProductType);
router.delete("/:id", deleteProductType);

export default router;
