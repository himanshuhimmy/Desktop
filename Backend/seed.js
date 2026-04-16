/**
 * Seeder — run with:  node seed.js
 *
 * Creates:
 *  - 1 admin + 10 users
 *  - 5 group conversations (with managers)
 *  - Several DMs (each user has 2-3)
 *  - Sample messages in every conversation
 *  - 2 surveys
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "./models/userModel.js";
import Conversation from "./models/conversationModel.js";
import Message from "./models/messageModel.js";
import Survey from "./models/surveyModel.js";
import SurveyResponse from "./models/surveyResponseModel.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB");

// ─── Wipe existing data ───────────────────────────────────────────────────────
await Promise.all([
  User.deleteMany(),
  Conversation.deleteMany(),
  Message.deleteMany(),
  Survey.deleteMany(),
  SurveyResponse.deleteMany(),
]);
console.log("Cleared existing data");

// ─── Users ────────────────────────────────────────────────────────────────────
const PASS = await bcrypt.hash("Pass@123", 10);

const admin = await User.create({
  name: "Super Admin",
  email: "admin@comm.com",
  password: PASS,
  userType: "admin",
  isActive: true,
});

const userNames = [
  "Alice Johnson",
  "Bob Martinez",
  "Carol White",
  "David Lee",
  "Eva Brown",
  "Frank Wilson",
  "Grace Kim",
  "Henry Clark",
  "Iris Davis",
  "Jack Taylor",
];

const users = await User.insertMany(
  userNames.map((name, i) => ({
    name,
    email: `user${i + 1}@comm.com`,
    password: PASS,
    userType: "user",
    isActive: true,
  }))
);

// shorthand refs
const [u1, u2, u3, u4, u5, u6, u7, u8, u9, u10] = users;
console.log(`Created admin + ${users.length} users`);

// ─── Helper: create a message in a conversation ───────────────────────────────
const addMessages = async (conversationId, pairs) => {
  // pairs: [{ sender, text }]
  const msgs = await Message.insertMany(
    pairs.map(({ sender, text }) => ({
      conversationId,
      senderId: sender._id,
      text,
      readBy: [sender._id],
    }))
  );
  // set lastMessage cache
  const last = msgs[msgs.length - 1];
  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: { text: last.text, senderId: last.senderId, createdAt: last.createdAt },
  });
};

// ─── Groups ───────────────────────────────────────────────────────────────────
// Group 1 — All Hands (all 10 users, manager: u1)
const allHands = await Conversation.create({
  isGroup: true,
  name: "All Hands",
  members: [admin._id, ...users.map((u) => u._id)],
  groupManagers: [u1._id],
  createdBy: admin._id,
});
await addMessages(allHands._id, [
  { sender: admin, text: "Welcome everyone to the All Hands channel!" },
  { sender: u1, text: "Excited to be here. Let's build something great." },
  { sender: u2, text: "Hey team 👋" },
  { sender: u5, text: "Happy to join!" },
  { sender: u3, text: "Looking forward to working with you all." },
]);

// Group 2 — Team Alpha (u1-u5, managers: u1 + u2 — multi manager demo)
const teamAlpha = await Conversation.create({
  isGroup: true,
  name: "Team Alpha",
  members: [admin._id, u1._id, u2._id, u3._id, u4._id, u5._id],
  groupManagers: [u1._id, u2._id],
  createdBy: admin._id,
});
await addMessages(teamAlpha._id, [
  { sender: u1, text: "Team Alpha sprint planning starts Monday." },
  { sender: u2, text: "I'll set up the board." },
  { sender: u3, text: "What are our priorities?" },
  { sender: u4, text: "Finishing the auth flow first." },
  { sender: u5, text: "Agreed. I can help with the UI side." },
]);

// Group 3 — Team Beta (u6-u10, manager: u7)
const teamBeta = await Conversation.create({
  isGroup: true,
  name: "Team Beta",
  members: [admin._id, u6._id, u7._id, u8._id, u9._id, u10._id],
  groupManagers: [u7._id],
  createdBy: admin._id,
});
await addMessages(teamBeta._id, [
  { sender: u7, text: "Team Beta — welcome! I'm your group manager." },
  { sender: u6, text: "Glad to be here!" },
  { sender: u8, text: "Same. What's our first task?" },
  { sender: u9, text: "We're starting on the reporting module." },
  { sender: u10, text: "I'll review the existing code first." },
]);

// Group 4 — Project X (u1, u3, u5, u7, u9, managers: u3 + u5 — multi manager)
const projectX = await Conversation.create({
  isGroup: true,
  name: "Project X",
  members: [admin._id, u1._id, u3._id, u5._id, u7._id, u9._id],
  groupManagers: [u3._id, u5._id],
  createdBy: admin._id,
});
await addMessages(projectX._id, [
  { sender: u3, text: "Project X kickoff — let's keep this focused." },
  { sender: u5, text: "I've prepared the initial spec doc." },
  { sender: u1, text: "Sharing it in the files." },
  { sender: u7, text: "When's the deadline?" },
  { sender: u9, text: "End of Q2." },
]);

// Group 5 — Design Pod (u2, u4, u6, u8, u10, manager: u4)
const designPod = await Conversation.create({
  isGroup: true,
  name: "Design Pod",
  members: [admin._id, u2._id, u4._id, u6._id, u8._id, u10._id],
  groupManagers: [u4._id],
  createdBy: admin._id,
});
await addMessages(designPod._id, [
  { sender: u4, text: "Design Pod is live. Let's sync on Figma access." },
  { sender: u2, text: "Sent you all invites." },
  { sender: u6, text: "Got it, thanks!" },
  { sender: u8, text: "Reviewing the mockups now." },
  { sender: u10, text: "Leaving comments as I go." },
]);

console.log("Created 5 groups");

// ─── DMs ──────────────────────────────────────────────────────────────────────
// Each user ends up with 2-3 DMs
const dmPairs = [
  [u1, u2], [u1, u3],         // u1 has 2 DMs
  [u2, u4],                   // u2 has 3 (u1, u4, already counted)
  [u3, u5], [u3, u6],         // u3 has 3
  [u4, u7],                   // u4 has 3
  [u5, u8],                   // u5 has 3
  [u6, u9],                   // u6 has 3
  [u7, u10],                  // u7 has 3
  [u8, u9],                   // u8 has 3
  [u9, u10],                  // u9-u10 get one more each
  [u10, u1],                  // u10 has 3
];

const dmSampleTexts = [
  ["Hey! How's it going?", "Pretty good, been heads down on the sprint.", "Same haha. Coffee soon?"],
  ["Did you see the latest update?", "Yeah, looks solid. Good work.", "Thanks, had a lot of help!"],
  ["Can you review my PR when you get a chance?", "Sure, sending feedback now.", "Much appreciated!"],
  ["Meeting still at 3pm?", "Yep, same link.", "Perfect, see you then."],
  ["Quick question — how do we handle the edge case?", "Wrap it in a try-catch for now, we'll clean up later.", "Makes sense, thanks."],
];

for (let i = 0; i < dmPairs.length; i++) {
  const [a, b] = dmPairs[i];
  const dm = await Conversation.create({
    isGroup: false,
    members: [a._id, b._id],
    createdBy: a._id,
  });

  const texts = dmSampleTexts[i % dmSampleTexts.length];
  await addMessages(dm._id, [
    { sender: a, text: texts[0] },
    { sender: b, text: texts[1] },
    { sender: a, text: texts[2] },
  ]);
}

console.log(`Created ${dmPairs.length} DMs`);

// ─── Surveys ──────────────────────────────────────────────────────────────────
const survey1 = await Survey.create({
  title: "Team Satisfaction Q2",
  isActive: true,
  createdBy: admin._id,
  questions: [
    {
      text: "How satisfied are you with the team communication?",
      type: "single",
      options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
    },
    {
      text: "Which tools do you use most?",
      type: "multiple",
      options: ["Slack", "Email", "This App", "Video Calls"],
    },
    {
      text: "Any suggestions for improvement?",
      type: "text",
      options: [],
    },
  ],
});

const survey2 = await Survey.create({
  title: "Onboarding Experience",
  isActive: true,
  createdBy: admin._id,
  questions: [
    {
      text: "How smooth was your onboarding?",
      type: "single",
      options: ["Very Smooth", "Okay", "Confusing", "Very Confusing"],
    },
    {
      text: "What would have helped you get started faster?",
      type: "text",
      options: [],
    },
  ],
});

// a few users have already responded to survey1
await SurveyResponse.create({
  surveyId: survey1._id,
  userId: u1._id,
  answers: [
    { questionIndex: 0, answer: "Satisfied" },
    { questionIndex: 1, answer: ["This App", "Video Calls"] },
    { questionIndex: 2, answer: "More async updates would help." },
  ],
  skipped: false,
});

await SurveyResponse.create({
  surveyId: survey1._id,
  userId: u2._id,
  answers: [],
  skipped: true,
});

console.log("Created 2 surveys with sample responses");

// ─── Done ─────────────────────────────────────────────────────────────────────
console.log("\n✅ Seeding complete!\n");
console.log("Admin login:  admin@comm.com / Pass@123");
console.log("User logins:  user1@comm.com … user10@comm.com / Pass@123");

await mongoose.disconnect();
