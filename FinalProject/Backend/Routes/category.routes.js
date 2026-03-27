import express from "express";
import {
  getAllCategories,
  getTypesByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categorycontroller.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id/types", getTypesByCategory);
categoryRouter.post("/", createCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export { categoryRouter };
