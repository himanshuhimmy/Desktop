import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    isGroup: { type: Boolean, default: false },
    // null for DMs, required for groups
    name: {
      type: String,
      trim: true,
      required: function () {
        return this.isGroup;
      },
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // one or more group managers — groups only (admin can add/remove)
    groupManagers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // cached for conversation list preview
    lastMessage: {
      text: String,
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
