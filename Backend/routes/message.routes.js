import { Router } from "express";
import { sendMessage, getMessages, markRead } from "../controllers/message.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.use(auth);

router.post("/:conversationId", sendMessage);
router.get("/:conversationId", getMessages);
router.patch("/:conversationId/read", markRead);

export default router;
