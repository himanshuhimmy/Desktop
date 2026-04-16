import { Router } from "express";
import {
  createConversation,
  getMyConversations,
  getConversation,
  updateMembers,
  updateManagers,
} from "../controllers/conversation.controller.js";
import auth from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const router = Router();

router.use(auth);

router.post("/", createConversation);
router.get("/", getMyConversations);
router.get("/:id", getConversation);
router.patch("/:id/members", updateMembers);
router.patch("/:id/managers", adminOnly, updateManagers);

export default router;
