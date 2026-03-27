import mongoose from "mongoose";

// Reusable embedded address schema.
// Used directly in userSchema (as an array) and spread into orderSchema (as a snapshot).
// _id: false because it is always embedded — never queried standalone.

const addressSchema = new mongoose.Schema(
  {
    label: { type: String }, // e.g. "Home", "Office"
    line1: { type: String },
    line2: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    country: { type: String, default: "IN" },
  },
  { _id: false },
);

export default addressSchema;
