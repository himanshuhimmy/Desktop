import express from "express";
import {
  getAllThemes,
  createTheme,
  updateTheme,
  deleteTheme,
} from "../controller/themecontroller.js";

const router = express.Router();

router.get("/", getAllThemes);
router.post("/", createTheme);
router.put("/:id", updateTheme);
router.delete("/:id", deleteTheme);

export default router;
