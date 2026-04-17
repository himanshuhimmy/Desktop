import express from "express";
import {
  getAllThemes,
  createTheme,
  updateTheme,
  deleteTheme,
} from "../controller/themecontroller.js";
import { requireAdmin } from "../middleware/authmiddleware.js";

const router = express.Router();

// Public read route
router.get("/", getAllThemes);

// Admin-only write routes
router.post("/", requireAdmin, createTheme);
router.put("/:id", requireAdmin, updateTheme);
router.delete("/:id", requireAdmin, deleteTheme);

export default router;
