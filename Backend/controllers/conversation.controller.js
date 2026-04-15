import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

// emit a system message into a conversation room
const systemMessage = async (io, conversationId, text) => {
  const msg = await Message.create({ conversationId, text, type: "system", readBy: [] });
  if (io) io.to(conversationId.toString()).emit("message_received", { message: msg });
  return msg;
};

//! POST /api/conversations  — create DM or group
export const createConversation = async (req, res) => {
  try {
    const { isGroup, name, memberIds, groupManagerId } = req.body;
    const myId = req.user._id.toString();

    if (isGroup) {
      // Group chat — admin creates it
      if (req.user.userType !== "admin")
        return res.status(403).json({ message: "Only admins can create groups" });
      if (!name) return res.status(400).json({ message: "Group name required" });
      if (!memberIds || memberIds.length < 2)
        return res.status(400).json({ message: "Group needs at least 2 members" });
      if (!groupManagerId)
        return res.status(400).json({ message: "groupManagerId required" });

      const allIds = [...new Set([...memberIds, myId])];
      const conversation = await Conversation.create({
        isGroup: true,
        name,
        members: allIds,
        groupManagers: [groupManagerId],
        createdBy: myId,
      });
      return res.status(201).json({ conversation });
    }

    // DM — exactly 2 members
    if (!memberIds || memberIds.length !== 1)
      return res.status(400).json({ message: "DM requires exactly 1 other member" });

    const otherId = memberIds[0];

    // return existing DM if one already exists
    const existing = await Conversation.findOne({
      isGroup: false,
      members: { $all: [myId, otherId], $size: 2 },
    });
    if (existing) return res.json({ conversation: existing });

    const conversation = await Conversation.create({
      isGroup: false,
      members: [myId, otherId],
      createdBy: myId,
    });
    res.status(201).json({ conversation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/conversations  — my conversations (with unread count per convo)
export const getMyConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ members: req.user._id })
      .populate("members", "name email")
      .populate("groupManagers", "name email")
      .populate("lastMessage.senderId", "name")
      .sort({ updatedAt: -1 });

    // attach unread count for each conversation
    const withUnread = await Promise.all(
      conversations.map(async (conv) => {
        const unreadCount = await Message.countDocuments({
          conversationId: conv._id,
          readBy: { $ne: req.user._id },
        });
        return { ...conv.toObject(), unreadCount };
      })
    );

    res.json({ conversations: withUnread });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! GET /api/conversations/:id
export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate("members", "name email")
      .populate("groupManagers", "name email");

    if (!conversation) return res.status(404).json({ message: "Conversation not found" });

    const isMember = conversation.members.some(
      (m) => m._id.toString() === req.user._id.toString()
    );
    if (!isMember) return res.status(403).json({ message: "Not a member" });

    res.json({ conversation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PATCH /api/conversations/:id/members  — add or remove members (group manager or admin)
export const updateMembers = async (req, res) => {
  try {
    const { action, userId } = req.body; // action: "add" | "remove"
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) return res.status(404).json({ message: "Conversation not found" });
    if (!conversation.isGroup)
      return res.status(400).json({ message: "Cannot modify DM members" });

    const myId = req.user._id.toString();
    const isAdmin = req.user.userType === "admin";
    const isManager = conversation.groupManagers.map(String).includes(myId);

    if (!isAdmin && !isManager)
      return res.status(403).json({ message: "Only group manager or admin can modify members" });

    const targetUser = await User.findById(userId).select("name");
    if (!targetUser) return res.status(404).json({ message: "Target user not found" });

    if (action === "add") {
      if (conversation.members.map(String).includes(userId))
        return res.status(400).json({ message: "User already in group" });
      conversation.members.push(userId);
    } else if (action === "remove") {
      if (conversation.groupManagers.map(String).includes(userId))
        return res.status(400).json({ message: "Cannot remove a group manager — demote them first" });
      conversation.members = conversation.members.filter((m) => m.toString() !== userId);
    } else {
      return res.status(400).json({ message: "action must be 'add' or 'remove'" });
    }

    await conversation.save();

    const sysText = action === "add"
      ? `${targetUser.name} was added to the group`
      : `${targetUser.name} was removed from the group`;
    await systemMessage(req.io, conversation._id, sysText);

    res.json({ message: `Member ${action}ed`, conversation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! PATCH /api/conversations/:id/managers  — add or remove a group manager (admin only)
export const updateManagers = async (req, res) => {
  try {
    const { action, userId } = req.body; // action: "add" | "remove"
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) return res.status(404).json({ message: "Conversation not found" });
    if (!conversation.isGroup) return res.status(400).json({ message: "Not a group" });

    const managerIds = conversation.groupManagers.map(String);

    const targetUser = await User.findById(userId).select("name");
    if (!targetUser) return res.status(404).json({ message: "Target user not found" });

    if (action === "add") {
      const isMember = conversation.members.map(String).includes(userId);
      if (!isMember)
        return res.status(400).json({ message: "User is not a member of this group" });
      if (managerIds.includes(userId))
        return res.status(400).json({ message: "User is already a manager" });
      conversation.groupManagers.push(userId);
    } else if (action === "remove") {
      if (managerIds.length <= 1)
        return res.status(400).json({ message: "Group must have at least one manager" });
      conversation.groupManagers = conversation.groupManagers.filter(
        (m) => m.toString() !== userId
      );
    } else {
      return res.status(400).json({ message: "action must be 'add' or 'remove'" });
    }

    await conversation.save();

    const sysText = action === "add"
      ? `${targetUser.name} was promoted to group manager`
      : `${targetUser.name} was removed as group manager`;
    await systemMessage(req.io, conversation._id, sysText);

    res.json({ message: `Manager ${action}ed successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
