import mongoose from "mongoose";
import addressSchema from "./addressSchema.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true }, // store hashed (bcrypt)
    phone: { type: String },
    addresses: [addressSchema], // multiple saved addresses
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "memberships",
      default: null,
    },
    planExpiresAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    lastLoginAt: { type: Date },
  },
  { collection: "users", timestamps: true }, // createdAt, updatedAt
);

userSchema.index({ email: 1 });

const userModel = mongoose.model("users", userSchema);

export default userModel;
