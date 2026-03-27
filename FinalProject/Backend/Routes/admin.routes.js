import express from "express";
import {
  adminLogin,
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getDashboard,
} from "../controller/admincontroller.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/dashboard", getDashboard);
router.get("/admins", getAllAdmins);
router.post("/admins", createAdmin);
router.patch("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);

export default router;
