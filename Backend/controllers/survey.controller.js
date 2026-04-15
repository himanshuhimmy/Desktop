import Survey from "../models/surveyModel.js";
import SurveyResponse from "../models/surveyResponseModel.js";

//! POST /api/surveys  — admin creates survey
export const createSurvey = async (req, res) => {
  try {
    const { title, questions } = req.body;
    if (!title || !questions?.length)
      return res.status(400).json({ message: "title and questions are required" });

    const survey = await Survey.create({ title, questions, createdBy: req.user._id });
    res.status(201).json({ survey });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/surveys  — active surveys the user hasn't responded to yet
export const getPendingSurveys = async (req, res) => {
  try {
    const responded = await SurveyResponse.find({ userId: req.user._id }).distinct("surveyId");
    const surveys = await Survey.find({ isActive: true, _id: { $nin: responded } });
    res.json({ surveys });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/surveys/all  — admin: all surveys
export const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find().populate("createdBy", "name").sort({ createdAt: -1 });
    res.json({ surveys });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PATCH /api/surveys/:id/status  — admin toggles active/inactive
export const toggleSurveyStatus = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) return res.status(404).json({ message: "Survey not found" });
    survey.isActive = !survey.isActive;
    await survey.save();
    res.json({ message: `Survey ${survey.isActive ? "activated" : "deactivated"}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! POST /api/surveys/:id/respond  — submit or skip (re-take allowed if previously skipped)
export const respondToSurvey = async (req, res) => {
  try {
    const { answers, skipped } = req.body;
    const survey = await Survey.findById(req.params.id);
    if (!survey) return res.status(404).json({ message: "Survey not found" });

    const existing = await SurveyResponse.findOne({
      surveyId: req.params.id,
      userId: req.user._id,
    });

    if (existing && !existing.skipped)
      return res.status(400).json({ message: "Already completed this survey" });

    // allow re-take after skip — update in place
    if (existing && existing.skipped) {
      existing.skipped = !!skipped;
      existing.answers = skipped ? [] : (answers || []);
      await existing.save();
      return res.json({ response: existing });
    }

    const response = await SurveyResponse.create({
      surveyId: req.params.id,
      userId: req.user._id,
      answers: skipped ? [] : (answers || []),
      skipped: !!skipped,
    });

    res.status(201).json({ response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! DELETE /api/surveys/:id/respond/:userId  — admin resets a user's skip so survey shows again
export const resetUserResponse = async (req, res) => {
  try {
    await SurveyResponse.deleteOne({ surveyId: req.params.id, userId: req.params.userId });
    res.json({ message: "Response reset — user will see this survey again on next login" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/surveys/dashboard  — user: all active surveys + their response status
export const getUserSurveyDashboard = async (req, res) => {
  try {
    const surveys   = await Survey.find({ isActive: true }).sort({ createdAt: -1 });
    const responses = await SurveyResponse.find({ userId: req.user._id });

    const responseMap = Object.fromEntries(responses.map((r) => [r.surveyId.toString(), r]));

    const result = surveys.map((s) => ({
      survey:   s,
      response: responseMap[s._id.toString()] || null,   // null = not yet taken
    }));

    res.json({ surveys: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/surveys/:id/responses  — admin: see all responses for a survey
export const getSurveyResponses = async (req, res) => {
  try {
    const responses = await SurveyResponse.find({ surveyId: req.params.id })
      .populate("userId", "name email");
    res.json({ responses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
