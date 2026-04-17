import express from "express";
import {
  register,
  login,
  getMe,
  logout,
} from "../controller/authcontroller.js";

const router = express.Router();

router.post("/logout", logout);
router.post("/register", register);
router.post("/login", login);
router.get("/me", getMe);

export default router;
