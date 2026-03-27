import express from "express";
import {
  getAllMemberships,
  getMembershipById,
  createMembership,
  updateMembership,
  deleteMembership,
  subscribe,
} from "../controller/membershipcontroller.js";

const router = express.Router();

router.get("/", getAllMemberships);
router.get("/:id", getMembershipById);
router.post("/subscribe", subscribe);
router.post("/", createMembership);
router.put("/:id", updateMembership);
router.delete("/:id", deleteMembership);

export default router;
