import express from "express";

import {
  getUserById,
  updateUser,
  changePassword,
  deleteUser,
} from "../controller/usercontroller.js";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controller/addresscontroller.js";

const router = express.Router();

router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.patch("/:id/password", changePassword);
router.delete("/:id", deleteUser);

router.get("/:userId/addresses", getAddresses);
router.post("/:userId/addresses", addAddress);
router.put("/:userId/addresses/:index", updateAddress);
router.delete("/:userId/addresses/:index", deleteAddress);

export default router;
