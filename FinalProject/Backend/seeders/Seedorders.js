// ─── seeders/seedOrders.js ────────────────────────────────────────────────────
// Seeds 30 realistic orders spread across all 3 users with varied statuses.
// Run AFTER npm run seed (needs users + products to exist in DB)
//
// npm run seed:orders  — adds orders only (does NOT clear other collections)
// npm run seed:fresh   — full reseed including orders

import mongoose from "mongoose";
import dotenv from "dotenv";

import userModel from "../models/userSchema.js";
import productModel from "../models/productSchema.js";
import orderModel from "../models/orderSchema.js";

dotenv.config();

const log = (msg) => console.log(`  ✔  ${msg}`);
const step = (title) => console.log(`\n──── ${title} ────`);
const done = (title, n) => console.log(`     → ${n} ${title} inserted`);

// ─── Realistic addresses ──────────────────────────────────────────────────────

const addresses = {
  arjun: [
    {
      label: "Home",
      line1: "12 MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "IN",
    },
    {
      label: "Office",
      line1: "5th Floor, Tech Park",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      country: "IN",
    },
  ],
  priya: [
    {
      label: "Home",
      line1: "22 Brigade Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      country: "IN",
    },
  ],
  rohit: [
    {
      label: "Home",
      line1: "8 Connaught Place",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      country: "IN",
    },
  ],
};

// ─── Order templates ──────────────────────────────────────────────────────────
// Each template defines which products/variants to pick by index
// Real productIds and variantIds are resolved at seed time

const ORDER_TEMPLATES = [
  // Arjun — 10 orders
  {
    userEmail: "arjun@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    daysAgo: 120,
    items: [
      { pIdx: 0, vIdx: 0, sIdx: 0, qty: 2 },
      { pIdx: 5, vIdx: 0, sIdx: 0, qty: 1 },
    ],
  },
  {
    userEmail: "arjun@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    daysAgo: 95,
    items: [{ pIdx: 2, vIdx: 0, sIdx: 1, qty: 1 }],
  },
  {
    userEmail: "arjun@example.com",
    addrIdx: 1,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    daysAgo: 80,
    items: [
      { pIdx: 10, vIdx: 0, sIdx: 0, qty: 1 },
      { pIdx: 11, vIdx: 0, sIdx: 0, qty: 1 },
    ],
  },
  {
    userEmail: "arjun@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "Debit Card",
    daysAgo: 65,
    items: [
      { pIdx: 20, vIdx: 0, sIdx: 1, qty: 1 },
      { pIdx: 21, vIdx: 1, sIdx: 0, qty: 2 },
    ],
  },
  {
    userEmail: "arjun@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "COD",
    daysAgo: 50,
    items: [{ pIdx: 3, vIdx: 0, sIdx: 0, qty: 1 }],
  },
  {
    userEmail: "arjun@example.com",
    addrIdx: 1,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    daysAgo: 10,
    items: [
      { pIdx: 14, vIdx: 0, sIdx: 1, qty: 1 },
      { pIdx: 30, vIdx: 0, sIdx: 0, qty: 1 },
    ],
  },
  {
    userEmail: "arjun@example.com",
    addrIdx: 0,
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    daysAgo: 5,
    items: [{ pIdx: 1, vIdx: 0, sIdx: 0, qty: 1 }],
  },
  {
    userEmail: "arjun@example.com",
    addrIdx: 0,
    status: "pending",
    paymentStatus: "unpaid",
    paymentMethod: "COD",
    daysAgo: 2,
    items: [
      { pIdx: 25, vIdx: 0, sIdx: 0, qty: 1 },
      { pIdx: 26, vIdx: 1, sIdx: 0, qty: 1 },
    ],
  },
  {
    userEmail: "arjun@example.com",
    addrIdx: 0,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "UPI",
    daysAgo: 40,
    items: [{ pIdx: 7, vIdx: 0, sIdx: 0, qty: 1 }],
  },
  {
    userEmail: "arjun@example.com",
    addrIdx: 1,
    status: "refunded",
    paymentStatus: "refunded",
    paymentMethod: "Credit Card",
    daysAgo: 70,
    items: [{ pIdx: 4, vIdx: 0, sIdx: 1, qty: 2 }],
  },

  // Priya — 11 orders
  {
    userEmail: "priya@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    daysAgo: 110,
    items: [
      { pIdx: 16, vIdx: 0, sIdx: 0, qty: 1 },
      { pIdx: 17, vIdx: 0, sIdx: 1, qty: 1 },
    ],
  },
  {
    userEmail: "priya@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    daysAgo: 90,
    items: [{ pIdx: 22, vIdx: 1, sIdx: 0, qty: 1 }],
  },
  {
    userEmail: "priya@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "COD",
    daysAgo: 75,
    items: [
      { pIdx: 9, vIdx: 0, sIdx: 0, qty: 2 },
      { pIdx: 8, vIdx: 0, sIdx: 0, qty: 1 },
    ],
  },
  {
    userEmail: "priya@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "Debit Card",
    daysAgo: 55,
    items: [{ pIdx: 13, vIdx: 0, sIdx: 1, qty: 1 }],
  },
  {
    userEmail: "priya@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    daysAgo: 35,
    items: [
      { pIdx: 18, vIdx: 0, sIdx: 0, qty: 1 },
      { pIdx: 19, vIdx: 0, sIdx: 0, qty: 1 },
    ],
  },
  {
    userEmail: "priya@example.com",
    addrIdx: 0,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    daysAgo: 12,
    items: [{ pIdx: 27, vIdx: 0, sIdx: 0, qty: 1 }],
  },
  {
    userEmail: "priya@example.com",
    addrIdx: 0,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    daysAgo: 8,
    items: [{ pIdx: 6, vIdx: 0, sIdx: 0, qty: 2 }],
  },
  {
    userEmail: "priya@example.com",
    addrIdx: 0,
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "COD",
    daysAgo: 4,
    items: [
      { pIdx: 15, vIdx: 0, sIdx: 0, qty: 1 },
      { pIdx: 28, vIdx: 0, sIdx: 0, qty: 1 },
    ],
  },
  {
    userEmail: "priya@example.com",
    addrIdx: 0,
    status: "pending",
    paymentStatus: "unpaid",
    paymentMethod: "UPI",
    daysAgo: 1,
    items: [{ pIdx: 29, vIdx: 0, sIdx: 0, qty: 1 }],
  },
  {
    userEmail: "priya@example.com",
    addrIdx: 0,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "Credit Card",
    daysAgo: 60,
    items: [{ pIdx: 12, vIdx: 0, sIdx: 1, qty: 1 }],
  },
  {
    userEmail: "priya@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "Debit Card",
    daysAgo: 100,
    items: [{ pIdx: 24, vIdx: 1, sIdx: 0, qty: 3 }],
  },

  // Rohit — 9 orders
  {
    userEmail: "rohit@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "COD",
    daysAgo: 85,
    items: [
      { pIdx: 0, vIdx: 1, sIdx: 0, qty: 1 },
      { pIdx: 31, vIdx: 0, sIdx: 0, qty: 1 },
    ],
  },
  {
    userEmail: "rohit@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    daysAgo: 60,
    items: [{ pIdx: 33, vIdx: 0, sIdx: 1, qty: 2 }],
  },
  {
    userEmail: "rohit@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "Debit Card",
    daysAgo: 45,
    items: [{ pIdx: 34, vIdx: 0, sIdx: 0, qty: 1 }],
  },
  {
    userEmail: "rohit@example.com",
    addrIdx: 0,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "COD",
    daysAgo: 7,
    items: [
      { pIdx: 35, vIdx: 0, sIdx: 0, qty: 1 },
      { pIdx: 36, vIdx: 0, sIdx: 0, qty: 2 },
    ],
  },
  {
    userEmail: "rohit@example.com",
    addrIdx: 0,
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    daysAgo: 3,
    items: [{ pIdx: 32, vIdx: 0, sIdx: 1, qty: 1 }],
  },
  {
    userEmail: "rohit@example.com",
    addrIdx: 0,
    status: "pending",
    paymentStatus: "unpaid",
    paymentMethod: "COD",
    daysAgo: 1,
    items: [{ pIdx: 37, vIdx: 0, sIdx: 0, qty: 1 }],
  },
  {
    userEmail: "rohit@example.com",
    addrIdx: 0,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "UPI",
    daysAgo: 30,
    items: [{ pIdx: 2, vIdx: 1, sIdx: 0, qty: 1 }],
  },
  {
    userEmail: "rohit@example.com",
    addrIdx: 0,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    daysAgo: 105,
    items: [
      { pIdx: 23, vIdx: 0, sIdx: 0, qty: 1 },
      { pIdx: 5, vIdx: 0, sIdx: 0, qty: 1 },
    ],
  },
  {
    userEmail: "rohit@example.com",
    addrIdx: 0,
    status: "refunded",
    paymentStatus: "refunded",
    paymentMethod: "Debit Card",
    daysAgo: 55,
    items: [{ pIdx: 11, vIdx: 0, sIdx: 0, qty: 2 }],
  },
];

// ─── Main seeder ──────────────────────────────────────────────────────────────

async function seedOrders() {
  step("Fetching users");
  const users = await userModel.find({
    email: {
      $in: ["arjun@example.com", "priya@example.com", "rohit@example.com"],
    },
  });

  if (users.length === 0) {
    console.error("  ✖  No users found. Run npm run seed first.");
    process.exit(1);
  }

  const userMap = Object.fromEntries(users.map((u) => [u.email, u]));
  log(`Found ${users.length} users`);

  step("Fetching products");
  const products = await productModel.find({ isActive: true });

  if (products.length === 0) {
    console.error("  ✖  No products found. Run npm run seed first.");
    process.exit(1);
  }
  log(`Found ${products.length} products`);

  step("Clearing existing orders");
  await orderModel.deleteMany({});
  log("Cleared existing orders");

  step("Seeding orders");
  const ordersToInsert = [];

  for (const template of ORDER_TEMPLATES) {
    const user = userMap[template.userEmail];
    if (!user) {
      console.warn(`  ⚠  User ${template.userEmail} not found — skipping`);
      continue;
    }

    const userAddr = addresses[template.userEmail.split("@")[0]];
    const shippingAddress = userAddr[template.addrIdx] ?? userAddr[0];

    let totalAmount = 0;
    const orderItems = [];

    for (const itemDef of template.items) {
      // clamp indexes to available products/variants/sizes
      const pIdx = itemDef.pIdx % products.length;
      const product = products[pIdx];
      if (!product || !product.variants?.length) continue;

      const vIdx = itemDef.vIdx % product.variants.length;
      const variant = product.variants[vIdx];
      if (!variant || !variant.sizes?.length) continue;

      const sIdx = itemDef.sIdx % variant.sizes.length;
      const sizeEntry = variant.sizes[sIdx];
      if (!sizeEntry) continue;

      const price = product.discountPrice ?? product.price;
      const qty = itemDef.qty ?? 1;

      orderItems.push({
        productId: product._id,
        variantId: variant._id,
        quantity: qty,
        priceAtPurchase: price,
        nameAtPurchase: product.name,
        variantSnapshot: {
          gender: variant.gender,
          color: variant.color,
          size: sizeEntry.size,
          sku: sizeEntry.sku,
        },
      });

      totalAmount += price * qty;
    }

    if (orderItems.length === 0) continue;

    const placedAt = new Date(Date.now() - template.daysAgo * 86_400_000);

    ordersToInsert.push({
      userId: user._id,
      items: orderItems,
      shippingAddress,
      status: template.status,
      totalAmount,
      discountAmount: 0,
      paymentMethod: template.paymentMethod,
      paymentStatus: template.paymentStatus,
      placedAt,
      deliveredAt:
        template.status === "delivered"
          ? new Date(placedAt.getTime() + 5 * 86_400_000)
          : undefined,
    });
  }

  const result = await orderModel.insertMany(ordersToInsert);
  done("orders", result.length);

  // ── Summary ──────────────────────────────────────────────────────────────
  const summary = {
    delivered: result.filter((o) => o.status === "delivered").length,
    shipped: result.filter((o) => o.status === "shipped").length,
    confirmed: result.filter((o) => o.status === "confirmed").length,
    pending: result.filter((o) => o.status === "pending").length,
    cancelled: result.filter((o) => o.status === "cancelled").length,
    refunded: result.filter((o) => o.status === "refunded").length,
  };
  console.log("\n  Order breakdown:");
  Object.entries(summary).forEach(([k, v]) =>
    console.log(`    ${k.padEnd(10)}: ${v}`),
  );
}

async function main() {
  console.log("\n╔══════════════════════════════════╗");
  console.log("║        Order Seeder              ║");
  console.log("╚══════════════════════════════════╝");

  if (!process.env.MONGO_URI) {
    console.error("\n  ✖  MONGO_URI not found in .env\n");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    log("Connected to MongoDB");

    await seedOrders();

    console.log("\n╔══════════════════════════════════╗");
    console.log("║   Orders seeded successfully!    ║");
    console.log("╚══════════════════════════════════╝\n");
    process.exit(0);
  } catch (err) {
    console.error("\n  ✖  Order seeder failed:", err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

main();
