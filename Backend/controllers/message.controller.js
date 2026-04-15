import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";

//! POST /api/messages/:conversationId  — send a message
export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "text is required" });

    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation) return res.status(404).json({ message: "Conversation not found" });

    const isMember = conversation.members.map(String).includes(req.user._id.toString());
    if (!isMember) return res.status(403).json({ message: "Not a member" });

    const message = await Message.create({
      conversationId: conversation._id,
      senderId: req.user._id,
      text,
      readBy: [req.user._id],
    });

    // update lastMessage cache on conversation
    conversation.lastMessage = { text, senderId: req.user._id, createdAt: message.createdAt };
    await conversation.save();

    // emit via socket if available
    if (req.io) {
      req.io.to(conversation._id.toString()).emit("message_received", {
        message: await message.populate("senderId", "name email"),
      });
    }

    res.status(201).json({ message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/messages/:conversationId  — paginated messages
export const getMessages = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation) return res.status(404).json({ message: "Conversation not found" });

    const isMember = conversation.members.map(String).includes(req.user._id.toString());
    if (!isMember) return res.status(403).json({ message: "Not a member" });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const skip = (page - 1) * limit;

    const messages = await Message.find({ conversationId: conversation._id })
      .populate("senderId", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ messages: messages.reverse(), page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PATCH /api/messages/:conversationId/read  — mark all unread as read
export const markRead = async (req, res) => {
  try {
    await Message.updateMany(
      {
        conversationId: req.params.conversationId,
        readBy: { $ne: req.user._id },
      },
      { $addToSet: { readBy: req.user._id } }
    );
    res.json({ message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
