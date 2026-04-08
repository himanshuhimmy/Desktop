import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/Db.js";

import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";
import productRoutes from "./Routes/product.routes.js";
import { categoryRouter as categoryRoutes } from "./Routes/category.routes.js";
import themeRoutes from "./Routes/theme.routes.js";
import membershipRoutes from "./Routes/membership.routes.js";
import cartRoutes from "./Routes/cart.routes.js";
import wishlistRoutes from "./Routes/wishlist.routes.js";
import orderRoutes from "./Routes/order.routes.js";
import adminRoutes from "./Routes/admin.routes.js";
import productTypeRoutes from "./Routes/productType.Routes.js";

dotenv.config();

const app = express();

// ─── Global middleware ─────────────────────────────────────────────────────────

app.use(cors()); // allow requests from your frontend
app.use(express.json()); // parse incoming JSON bodies

// ─── Connect database ──────────────────────────────────────────────────────────

connectDB();

// ─── Mount routes ──────────────────────────────────────────────────────────────

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/themes", themeRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/producttypes", productTypeRoutes);

// ─── 404 handler — catches any route that didn't match above ───────────────────

app.use((req, res) => {
  res
    .status(404)
    .json({ message: `Route ${req.method} ${req.path} not found` });
});

// ─── Global error handler — catches any error thrown inside a controller ───────
// Any controller that calls next(err) or throws will land here

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});

// ─── Start server ──────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
