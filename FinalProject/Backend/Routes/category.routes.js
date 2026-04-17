import express from "express";
import {
  getAllCategories,
  getTypesByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categorycontroller.js";
import { requireAdmin } from "../middleware/authmiddleware.js";

const categoryRouter = express.Router();

// Public read routes
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id/types", getTypesByCategory);

// Admin-only write routes
categoryRouter.post("/", requireAdmin, createCategory);
categoryRouter.put("/:id", requireAdmin, updateCategory);
categoryRouter.delete("/:id", requireAdmin, deleteCategory);

export { categoryRouter };
