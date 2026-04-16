import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import jwt from "jsonwebtoken";
import User from "./models/userModel.js";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import messageRoutes from "./routes/message.routes.js";
import surveyRoutes from "./routes/survey.routes.js";

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

// ─── Socket.io setup ──────────────────────────────────────────────────────────
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// authenticate socket connections with JWT
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token"));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user || !user.isActive) return next(new Error("Unauthorized"));
    socket.user = user;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.user.name}`);

  // join a conversation room
  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId);
  });

  // leave a conversation room
  socket.on("leave_conversation", (conversationId) => {
    socket.leave(conversationId);
  });

  // typing indicator
  socket.on("typing", ({ conversationId, isTyping }) => {
    socket.to(conversationId).emit("user_typing", {
      userId: socket.user._id,
      name: socket.user.name,
      isTyping,
    });
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.user.name}`);
  });
});

// ─── Global middleware ────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// attach io to every request so controllers can emit events
app.use((req, _res, next) => {
  req.io = io;
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/surveys", surveyRoutes);

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} not found` });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Something went wrong" });
});

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
