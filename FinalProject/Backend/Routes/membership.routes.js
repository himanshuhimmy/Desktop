import express from "express";
import {
  getAllMemberships,
  getMembershipById,
  createMembership,
  updateMembership,
  deleteMembership,
  subscribe,
} from "../controller/membershipcontroller.js";
import { requireAuth, requireAdmin } from "../middleware/authmiddleware.js";

const router = express.Router();

// Public read routes
router.get("/", getAllMemberships);
router.get("/:id", getMembershipById);

// User must be logged in to subscribe
router.post("/subscribe", requireAuth, subscribe);

// Admin-only write routes
router.post("/", requireAdmin, createMembership);
router.put("/:id", requireAdmin, updateMembership);
router.delete("/:id", requireAdmin, deleteMembership);

export default router;
