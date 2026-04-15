import mongoose from "mongoose";

const surveyResponseSchema = new mongoose.Schema(
  {
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [
      {
        questionIndex: Number,
        answer: mongoose.Schema.Types.Mixed, // string or [string]
        _id: false,
      },
    ],
    skipped: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// one response per user per survey
surveyResponseSchema.index({ surveyId: 1, userId: 1 }, { unique: true });

export default mongoose.model("SurveyResponse", surveyResponseSchema);
