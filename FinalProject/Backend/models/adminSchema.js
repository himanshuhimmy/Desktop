import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // store hashed (bcrypt)
    role: {
      type: String,
      enum: ["superadmin", "manager", "support"],
      default: "manager",
    },
    isActive: { type: Boolean, default: true },
  },
  { collection: "admins", timestamps: true }, // createdAt, updatedAt
);

const adminModel = mongoose.model("admins", adminSchema);

export default adminModel;
