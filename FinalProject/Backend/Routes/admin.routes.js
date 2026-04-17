import express from "express";
import {
  adminLogin,
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getDashboard,
  adminLogout,
} from "../controller/admincontroller.js";
import { requireAdmin } from "../middleware/authmiddleware.js";
const router = express.Router();

router.get("/dashboard", requireAdmin, getDashboard);
router.get("/admins", requireAdmin, getAllAdmins);
router.post("/admins", requireAdmin, createAdmin);
router.patch("/admins/:id", requireAdmin, updateAdmin);
router.delete("/admins/:id", requireAdmin, deleteAdmin);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);

// router.get("/dashboard", getDashboard);
// router.get("/admins", getAllAdmins);
// router.post("/admins", createAdmin);
// router.patch("/admins/:id", updateAdmin);
// router.delete("/admins/:id", deleteAdmin);

export default router;
