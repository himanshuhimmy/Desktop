import express from "express";

import {
  getUserById,
  updateUser,
  changePassword,
  deleteUser,
  getAllUsers,
  ActivateUser,
} from "../controller/usercontroller.js";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controller/addresscontroller.js";
import { requireAuth, requireAdmin } from "../middleware/authmiddleware.js";
const router = express.Router();

router.patch("/Activate/:id", requireAdmin, ActivateUser);
router.get("/:id", requireAuth, getUserById);
router.patch("/:id", requireAuth, updateUser);
router.patch("/:id/password", requireAuth, changePassword);
router.delete("/:id", requireAuth, deleteUser);
router.get("/", requireAdmin, getAllUsers);

// router.get("/", getAllUsers);
// router.get("/:id", getUserById);
// router.patch("/:id", updateUser);
// router.patch("/:id/password", changePassword);
// router.delete("/:id", deleteUser);
// router.patch("/Activate/:id", ActivateUser);

router.get("/:userId/addresses", requireAuth, getAddresses);
router.post("/:userId/addresses", requireAuth, addAddress);
router.put("/:userId/addresses/:index", requireAuth, updateAddress);
router.delete("/:userId/addresses/:index", requireAuth, deleteAddress);

export default router;
