import { Router } from "express";
import {
  createUser,
  getUsers,
  toggleUserStatus,
  updateUser,
} from "../controllers/admin.controller.js";
import auth from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const router = Router();

router.use(auth, adminOnly);

router.post("/users", createUser);
router.get("/users", getUsers);
router.patch("/users/:id/status", toggleUserStatus);
router.patch("/users/:id", updateUser);

export default router;
