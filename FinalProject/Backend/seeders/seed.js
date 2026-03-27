// ─── seeders/seed.js ──────────────────────────────────────────────────────────
// npm run seed        — clears all collections, then seeds fresh data
// npm run seed:clear  — clears all collections only

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import adminModel from "../models/adminSchema.js";
import membershipModel from "../models/membershipSchema.js";
import userModel from "../models/userSchema.js";
import categoryModel from "../models/categorySchema.js";
import productTypeModel from "../models/productTypeSchema.js";
import productThemeModel from "../models/productThemeSchema.js";
import productModel from "../models/productSchema.js";
import cartModel from "../models/cartSchema.js";
import wishlistModel from "../models/wishlistSchema.js";
import orderModel from "../models/orderSchema.js";

import {
  themes,
  categories,
  productTypes,
  memberships,
  admins,
  users,
  products,
  productImages,
} from "./data.js";

dotenv.config();

const SALT_ROUNDS = 10;
const log = (msg) => console.log(`  ✔  ${msg}`);
const warn = (msg) => console.warn(`  ⚠  ${msg}`);
const step = (title) => console.log(`\n──── ${title} ────`);
const done = (title, n) => console.log(`     → ${n} ${title} inserted`);

async function clearAll() {
  step("Clearing collections");
  const models = [
    adminModel,
    membershipModel,
    userModel,
    categoryModel,
    productTypeModel,
    productThemeModel,
    productModel,
    cartModel,
    wishlistModel,
    orderModel,
  ];
  for (const model of models) {
    await model.deleteMany({});
    log(`Cleared → ${model.collection.name}`);
  }
}

async function seedAdmins() {
  step("Seeding admins");
  const hashed = await Promise.all(
    admins.map(async (a) => ({
      ...a,
      password: await bcrypt.hash(a.password, SALT_ROUNDS),
    })),
  );
  const result = await adminModel.insertMany(hashed);
  done("admins", result.length);
}

async function seedMemberships() {
  step("Seeding memberships");
  const result = await membershipModel.insertMany(memberships);
  done("memberships", result.length);
  return Object.fromEntries(result.map((m) => [m.name, m]));
}

async function seedUsers(membershipMap) {
  step("Seeding users");
  const prepared = await Promise.all(
    users.map(async (u) => {
      const plan = membershipMap[u.planName];
      if (!plan) warn(`Membership "${u.planName}" not found for ${u.email}`);
      const { planName, ...rest } = u;
      return {
        ...rest,
        password: await bcrypt.hash(u.password, SALT_ROUNDS),
        planId: plan?._id ?? null,
        planExpiresAt: plan
          ? new Date(Date.now() + plan.durationDays * 86_400_000)
          : null,
      };
    }),
  );
  const result = await userModel.insertMany(prepared);
  done("users", result.length);
}

async function seedCategories() {
  step("Seeding categories");
  const result = await categoryModel.insertMany(categories);
  done("categories", result.length);
  return Object.fromEntries(result.map((c) => [c.slug, c]));
}

async function seedProductTypes(categoryMap) {
  step("Seeding product types");
  const prepared = productTypes.map((pt) => {
    const cat = categoryMap[pt.catSlug];
    if (!cat) warn(`Category "${pt.catSlug}" not found for type "${pt.name}"`);
    const { catSlug, ...rest } = pt;
    return { ...rest, catId: cat?._id };
  });
  const result = await productTypeModel.insertMany(prepared);
  done("product types", result.length);
  return Object.fromEntries(result.map((t) => [t.name, t]));
}

async function seedProductThemes() {
  step("Seeding product themes");
  const result = await productThemeModel.insertMany(themes);
  done("product themes", result.length);
  return Object.fromEntries(result.map((t) => [t.name, t]));
}

async function seedProducts(themeMap, categoryMap, typeMap) {
  step("Seeding products");

  const prepared = products.map((p) => {
    const theme = themeMap[p.themeName];
    const type = typeMap[p.typeName];

    if (!theme) warn(`Theme "${p.themeName}" not found for "${p.name}"`);
    if (!type) warn(`Type  "${p.typeName}"  not found for "${p.name}"`);

    const cat = type
      ? Object.values(categoryMap).find(
          (c) => c._id.toString() === type.catId.toString(),
        )
      : null;

    // ── New variant structure: attach images per gender+color combination ──
    const variants = p.variants.map((v) => {
      // Look up image for this theme → type → color
      // Falls back to Regular → type → color, then a generic image
      const colorImages = productImages[p.themeName]?.[p.typeName]?.[v.color] ??
        productImages["Regular"]?.[p.typeName]?.[v.color] ??
        productImages["Regular"]?.[p.typeName]?.["black"] ?? {
          display:
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80&fit=crop",
          poses: [],
        };

      return {
        gender: v.gender,
        color: v.color,
        images: colorImages,
        sizes: v.sizes, // [{ size, sku, stock }]
      };
    });

    const { themeName, typeName, ...rest } = p;
    return {
      ...rest,
      variants,
      themeId: theme?._id,
      typeId: type?._id,
      catId: cat?._id,
    };
  });

  const result = await productModel.insertMany(prepared);
  done("products", result.length);
}

async function main() {
  const mode = process.argv[2] ?? "seed";

  console.log("\n╔══════════════════════════════════╗");
  console.log("║        Database Seeder           ║");
  console.log(`║  mode: ${mode.padEnd(25)}║`);
  console.log("╚══════════════════════════════════╝");

  if (!process.env.MONGO_URI) {
    console.error("\n  ✖  MONGO_URI not found in .env\n");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    log("Connected to MongoDB");

    await clearAll();

    if (mode === "clear") {
      console.log("\n  Done — all collections cleared.\n");
      process.exit(0);
    }

    await seedAdmins();
    const membershipMap = await seedMemberships();
    await seedUsers(membershipMap);
    const categoryMap = await seedCategories();
    const typeMap = await seedProductTypes(categoryMap);
    const themeMap = await seedProductThemes();
    await seedProducts(themeMap, categoryMap, typeMap);

    console.log("\n╔══════════════════════════════════╗");
    console.log("║      Seeding complete!           ║");
    console.log("╚══════════════════════════════════╝\n");
    process.exit(0);
  } catch (err) {
    console.error("\n  ✖  Seeder failed:", err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

main();
