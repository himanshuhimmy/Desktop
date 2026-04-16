import { Router } from "express";
import {
  createSurvey,
  getPendingSurveys,
  getAllSurveys,
  toggleSurveyStatus,
  respondToSurvey,
  getSurveyResponses,
  getUserSurveyDashboard,
  resetUserResponse,
} from "../controllers/survey.controller.js";
import auth from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

const router = Router();

router.use(auth);

router.post("/", adminOnly, createSurvey);
router.get("/", getPendingSurveys);                                         // user: pending (popup)
router.get("/all", adminOnly, getAllSurveys);                               // admin: all surveys
router.get("/dashboard", getUserSurveyDashboard);                          // user: survey page
router.patch("/:id/status", adminOnly, toggleSurveyStatus);
router.post("/:id/respond", respondToSurvey);
router.get("/:id/responses", adminOnly, getSurveyResponses);               // admin: see responses
router.delete("/:id/respond/:userId", adminOnly, resetUserResponse);       // admin: reset skip

export default router;
