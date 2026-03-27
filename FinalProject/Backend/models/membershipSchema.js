import mongoose from "mongoose";

// No hardcoded tier enum — admins create / remove tiers freely via CRUD.
// `name` is the tier label (e.g. "Gold", "Student", "Enterprise").

const membershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // e.g. "Gold", "Student", "Enterprise"
    },
    price: { type: Number, required: true, min: 0 },
    durationDays: { type: Number, required: true, min: 1 },
    discountPercent: { type: Number, default: 0, min: 0, max: 100 },
    perks: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { collection: "memberships", timestamps: true }, // createdAt, updatedAt
);

membershipSchema.index({ name: 1 });

const membershipModel = mongoose.model("memberships", membershipSchema);

export default membershipModel;
