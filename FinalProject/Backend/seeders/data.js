// ─── seeders/data.js ──────────────────────────────────────────────────────────

// ─── Themes ───────────────────────────────────────────────────────────────────

export const themes = [
  { name: "DC", isExclusive: false },
  { name: "Stranger Things", isExclusive: false },
  { name: "Harry Potter", isExclusive: true },
  { name: "Marvel", isExclusive: false },
  { name: "Regular", isExclusive: false },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories = [
  { name: "Tops", slug: "tops" },
  { name: "Bottoms", slug: "bottoms" },
  { name: "Footwear", slug: "footwear" },
  { name: "Headwear", slug: "headwear" },
  { name: "Accessories", slug: "accessories" },
];

// ─── Product Types ─────────────────────────────────────────────────────────────

export const productTypes = [
  { name: "T-Shirt", catSlug: "tops" },
  { name: "Hoodie", catSlug: "tops" },
  { name: "Sweatshirt", catSlug: "tops" },
  { name: "Joggers", catSlug: "bottoms" },
  { name: "Shorts", catSlug: "bottoms" },
  { name: "Sneakers", catSlug: "footwear" },
  { name: "Socks", catSlug: "footwear" },
  { name: "Cap", catSlug: "headwear" },
  { name: "Beanie", catSlug: "headwear" },
  { name: "Tote Bag", catSlug: "accessories" },
  { name: "Mug", catSlug: "accessories" },
];

// ─── Memberships ──────────────────────────────────────────────────────────────

export const memberships = [
  {
    name: "Free",
    price: 0,
    durationDays: 36500,
    discountPercent: 0,
    perks: ["Access to regular collection"],
  },
  {
    name: "Fan",
    price: 199,
    durationDays: 30,
    discountPercent: 5,
    perks: ["5% off all orders", "Early access to drops", "Fan newsletter"],
  },
  {
    name: "Hero",
    price: 499,
    durationDays: 90,
    discountPercent: 10,
    perks: [
      "10% off all orders",
      "Exclusive Hero drops",
      "Free shipping",
      "Priority support",
    ],
  },
  {
    name: "Legend",
    price: 999,
    durationDays: 365,
    discountPercent: 20,
    perks: [
      "20% off all orders",
      "All exclusive collections",
      "Free express shipping",
      "Birthday gift",
      "Early access to everything",
    ],
  },
];

// ─── Admins ───────────────────────────────────────────────────────────────────

export const admins = [
  { username: "superadmin", password: "Admin@1234", role: "superadmin" },
  { username: "manager1", password: "Manager@1234", role: "manager" },
];

// ─── Users ────────────────────────────────────────────────────────────────────

export const users = [
  {
    name: "Arjun Sharma",
    email: "arjun@example.com",
    password: "User@1234",
    phone: "9876543210",
    planName: "Hero",
    isEmailVerified: true,
    addresses: [
      {
        label: "Home",
        line1: "12 MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
      },
      {
        label: "Office",
        line1: "5th Floor, Tech Park",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411001",
      },
    ],
  },
  {
    name: "Priya Nair",
    email: "priya@example.com",
    password: "User@1234",
    phone: "9123456780",
    planName: "Legend",
    isEmailVerified: true,
    addresses: [
      {
        label: "Home",
        line1: "22 Brigade Road",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560001",
      },
    ],
  },
  {
    name: "Rohit Verma",
    email: "rohit@example.com",
    password: "User@1234",
    phone: "9988776655",
    planName: "Fan",
    isEmailVerified: false,
    addresses: [],
  },
];

// ─── Image map ────────────────────────────────────────────────────────────────
// Keyed by theme → type → color → { display, poses[] }
// Used by the seeder to attach images to each gender+color variant

export const productImages = {
  DC: {
    "T-Shirt": {
      black: {
        display:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&fit=crop",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80&fit=crop",
        ],
      },
      white: {
        display:
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80&fit=crop",
        ],
      },
      grey: {
        display:
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80&fit=crop",
        poses: [],
      },
      red: {
        display:
          "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Hoodie: {
      charcoal: {
        display:
          "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80&fit=crop",
        ],
      },
      navy: {
        display:
          "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1614495640808-b6b8b0b67021?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Sweatshirt: {
      grey: {
        display:
          "https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Cap: {
      black: {
        display:
          "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80&fit=crop",
        ],
      },
      red: {
        display:
          "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    "Tote Bag": {
      natural: {
        display:
          "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80&fit=crop",
        ],
      },
    },
  },

  "Stranger Things": {
    "T-Shirt": {
      maroon: {
        display:
          "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80&fit=crop",
        ],
      },
      grey: {
        display:
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Hoodie: {
      black: {
        display:
          "https://images.unsplash.com/photo-1614495640808-b6b8b0b67021?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80&fit=crop",
        ],
      },
      red: {
        display:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Sweatshirt: {
      grey: {
        display:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1565084888279-aca607bb7f2a?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Cap: {
      black: {
        display:
          "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80&fit=crop",
        ],
      },
    },
    Joggers: {
      black: {
        display:
          "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80&fit=crop",
        ],
      },
    },
    "Tote Bag": {
      cream: {
        display:
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&q=80&fit=crop",
        ],
      },
    },
  },

  "Harry Potter": {
    "T-Shirt": {
      beige: {
        display:
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1611911813383-67769b37a149?w=800&q=80&fit=crop",
        ],
      },
      white: {
        display:
          "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80&fit=crop",
        poses: [],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80&fit=crop",
        poses: [],
      },
      crimson: {
        display:
          "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Hoodie: {
      crimson: {
        display:
          "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80&fit=crop",
        ],
      },
      navy: {
        display:
          "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80&fit=crop",
        poses: [],
      },
      charcoal: {
        display:
          "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Sweatshirt: {
      grey: {
        display:
          "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80&fit=crop",
        ],
      },
      crimson: {
        display:
          "https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Beanie: {
      grey: {
        display:
          "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1511154527858-b0b14d6e3a93?w=800&q=80&fit=crop",
        ],
      },
      maroon: {
        display:
          "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Mug: {
      black: {
        display:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=800&q=80&fit=crop",
        ],
      },
    },
    "Tote Bag": {
      parchment: {
        display:
          "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=800&q=80&fit=crop",
        ],
      },
      natural: {
        display:
          "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Joggers: {
      black: {
        display:
          "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80&fit=crop",
        poses: [],
      },
      grey: {
        display:
          "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80&fit=crop",
        poses: [],
      },
    },
  },

  Marvel: {
    "T-Shirt": {
      white: {
        display:
          "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1596609548086-85bbf8dcea31?w=800&q=80&fit=crop",
        ],
      },
      red: {
        display:
          "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=80&fit=crop",
        poses: [],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80&fit=crop",
        poses: [],
      },
      grey: {
        display:
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Hoodie: {
      olive: {
        display:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&fit=crop",
        ],
      },
      red: {
        display:
          "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80&fit=crop",
        poses: [],
      },
      charcoal: {
        display:
          "https://images.unsplash.com/photo-1614495640808-b6b8b0b67021?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Sweatshirt: {
      grey: {
        display:
          "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?w=800&q=80&fit=crop",
        poses: [],
      },
      red: {
        display:
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Joggers: {
      black: {
        display:
          "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80&fit=crop",
        ],
      },
      grey: {
        display:
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Shorts: {
      red: {
        display:
          "https://images.unsplash.com/photo-1562588605-b7e9471c9b7a?w=800&q=80&fit=crop",
        poses: [],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Cap: {
      red: {
        display:
          "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    "Tote Bag": {
      natural: {
        display:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80&fit=crop",
        poses: [],
      },
    },
  },

  Regular: {
    "T-Shirt": {
      white: {
        display:
          "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80&fit=crop",
        ],
      },
      grey: {
        display:
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80&fit=crop",
        poses: [],
      },
      navy: {
        display:
          "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80&fit=crop",
        poses: [],
      },
      olive: {
        display:
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Hoodie: {
      grey: {
        display:
          "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1503341338985-95035e15c47c?w=800&q=80&fit=crop",
        ],
      },
      pink: {
        display:
          "https://images.unsplash.com/photo-1614495640808-b6b8b0b67021?w=800&q=80&fit=crop",
        poses: [],
      },
      navy: {
        display:
          "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Sweatshirt: {
      grey: {
        display:
          "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?w=800&q=80&fit=crop",
        poses: [],
      },
      white: {
        display:
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80&fit=crop",
        poses: [],
      },
      cream: {
        display:
          "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Joggers: {
      black: {
        display:
          "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80&fit=crop",
        ],
      },
      grey: {
        display:
          "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80&fit=crop",
        poses: [],
      },
      olive: {
        display:
          "https://images.unsplash.com/photo-1565084888279-aca607bb7f2a?w=800&q=80&fit=crop",
        poses: [],
      },
      navy: {
        display:
          "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Shorts: {
      khaki: {
        display:
          "https://images.unsplash.com/photo-1562588605-b7e9471c9b7a?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80&fit=crop",
        poses: [],
      },
      grey: {
        display:
          "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80&fit=crop",
        poses: [],
      },
      navy: {
        display:
          "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Sneakers: {
      white: {
        display:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80&fit=crop",
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Socks: {
      white: {
        display:
          "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&q=80&fit=crop",
        poses: [],
      },
      grey: {
        display:
          "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Cap: {
      black: {
        display:
          "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80&fit=crop",
        ],
      },
      white: {
        display:
          "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80&fit=crop",
        poses: [],
      },
      olive: {
        display:
          "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&q=80&fit=crop",
        poses: [],
      },
      navy: {
        display:
          "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Beanie: {
      black: {
        display:
          "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80&fit=crop",
        ],
      },
      grey: {
        display:
          "https://images.unsplash.com/photo-1511154527858-b0b14d6e3a93?w=800&q=80&fit=crop",
        poses: [],
      },
      cream: {
        display:
          "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80&fit=crop",
        poses: [],
      },
      navy: {
        display:
          "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    "Tote Bag": {
      natural: {
        display:
          "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&fit=crop",
        poses: [],
      },
      grey: {
        display:
          "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80&fit=crop",
        poses: [],
      },
    },
    Mug: {
      white: {
        display:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80&fit=crop",
        poses: [
          "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=800&q=80&fit=crop",
        ],
      },
      black: {
        display:
          "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=800&q=80&fit=crop",
        poses: [],
      },
      cream: {
        display:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80&fit=crop",
        poses: [],
      },
    },
  },
};

// ─── Helper to build a variant (gender + color + sizes[]) ─────────────────────
// sizes is an array of { size, sku, stock }

const variant = (gender, color, sizes) => ({ gender, color, sizes });
const sz = (size, sku, stock) => ({ size, sku, stock });

// ─── Products ─────────────────────────────────────────────────────────────────

export const products = [
  // ════════════════════════════════════════════════════════
  //  DC  — Tops (3), Headwear (2), Accessories (1)
  // ════════════════════════════════════════════════════════

  {
    name: "DC Heroes Tee",
    description:
      "Heavyweight 100% cotton tee featuring the iconic DC heroes roster print.",
    price: 599,
    discountPrice: 499,
    themeName: "DC",
    typeName: "T-Shirt",
    tags: ["dc", "superhero", "tshirt", "graphic"],
    variants: [
      variant("male", "black", [
        sz("S", "DC-TS-M-S-BLK", 30),
        sz("M", "DC-TS-M-M-BLK", 50),
        sz("L", "DC-TS-M-L-BLK", 40),
        sz("XL", "DC-TS-M-XL-BLK", 20),
      ]),
      variant("female", "white", [
        sz("S", "DC-TS-F-S-WHT", 25),
        sz("M", "DC-TS-F-M-WHT", 35),
        sz("L", "DC-TS-F-L-WHT", 20),
      ]),
      variant("kids", "grey", [
        sz("S", "DC-TS-K-S-GRY", 15),
        sz("M", "DC-TS-K-M-GRY", 20),
      ]),
      variant("male", "red", [
        sz("M", "DC-TS-M-M-RED", 30),
        sz("L", "DC-TS-M-L-RED", 25),
      ]),
    ],
  },
  {
    name: "Superman Shield Tee",
    description: "Classic Superman shield graphic on a soft cotton blend tee.",
    price: 549,
    discountPrice: null,
    themeName: "DC",
    typeName: "T-Shirt",
    tags: ["dc", "superman", "tshirt"],
    variants: [
      variant("male", "blue", [
        sz("S", "DC-SM-M-S-BLU", 20),
        sz("M", "DC-SM-M-M-BLU", 40),
        sz("L", "DC-SM-M-L-BLU", 35),
        sz("XL", "DC-SM-M-XL-BLU", 15),
      ]),
      variant("female", "blue", [
        sz("S", "DC-SM-F-S-BLU", 20),
        sz("M", "DC-SM-F-M-BLU", 30),
      ]),
      variant("kids", "red", [
        sz("S", "DC-SM-K-S-RED", 20),
        sz("M", "DC-SM-K-M-RED", 25),
      ]),
    ],
  },
  {
    name: "Batman Dark Knight Hoodie",
    description:
      "Premium fleece hoodie with embroidered Batman logo and subtle gotham cityscape lining.",
    price: 1299,
    discountPrice: 1099,
    themeName: "DC",
    typeName: "Hoodie",
    tags: ["dc", "batman", "hoodie"],
    variants: [
      variant("male", "charcoal", [
        sz("M", "DC-HD-M-M-CHR", 30),
        sz("L", "DC-HD-M-L-CHR", 40),
        sz("XL", "DC-HD-M-XL-CHR", 25),
      ]),
      variant("female", "charcoal", [
        sz("S", "DC-HD-F-S-CHR", 20),
        sz("M", "DC-HD-F-M-CHR", 30),
      ]),
      variant("unisex", "navy", [
        sz("M", "DC-HD-U-M-NVY", 25),
        sz("L", "DC-HD-U-L-NVY", 15),
      ]),
    ],
  },
  {
    name: "Justice League Hoodie",
    description:
      "All-member Justice League print on a heavyweight pullover hoodie.",
    price: 1399,
    discountPrice: 1199,
    themeName: "DC",
    typeName: "Hoodie",
    tags: ["dc", "justiceleague", "hoodie"],
    variants: [
      variant("male", "black", [
        sz("S", "DC-JL-M-S-BLK", 20),
        sz("M", "DC-JL-M-M-BLK", 35),
        sz("L", "DC-JL-M-L-BLK", 30),
        sz("XL", "DC-JL-M-XL-BLK", 15),
      ]),
      variant("female", "black", [
        sz("S", "DC-JL-F-S-BLK", 15),
        sz("M", "DC-JL-F-M-BLK", 25),
      ]),
    ],
  },
  {
    name: "DC Gotham Sweatshirt",
    description:
      "Gotham City skyline embossed on a brushed fleece crewneck sweatshirt.",
    price: 999,
    discountPrice: 849,
    themeName: "DC",
    typeName: "Sweatshirt",
    tags: ["dc", "gotham", "sweatshirt"],
    variants: [
      variant("male", "grey", [
        sz("S", "DC-SW-M-S-GRY", 25),
        sz("M", "DC-SW-M-M-GRY", 40),
        sz("L", "DC-SW-M-L-GRY", 35),
      ]),
      variant("female", "grey", [
        sz("S", "DC-SW-F-S-GRY", 20),
        sz("M", "DC-SW-F-M-GRY", 30),
      ]),
      variant("male", "black", [
        sz("M", "DC-SW-M-M-BLK", 30),
        sz("L", "DC-SW-M-L-BLK", 25),
      ]),
    ],
  },
  {
    name: "DC Comics Cap",
    description: "6-panel structured cap with DC Comics emblem front patch.",
    price: 499,
    discountPrice: null,
    themeName: "DC",
    typeName: "Cap",
    tags: ["dc", "cap", "headwear"],
    variants: [
      variant("unisex", "black", [
        sz("M", "DC-CP-U-M-BLK", 60),
        sz("L", "DC-CP-U-L-BLK", 40),
      ]),
      variant("unisex", "red", [sz("M", "DC-CP-U-M-RED", 30)]),
    ],
  },
  {
    name: "Batman Symbol Cap",
    description: "Minimalist Batman symbol embroidery on a clean snapback.",
    price: 549,
    discountPrice: null,
    themeName: "DC",
    typeName: "Cap",
    tags: ["dc", "batman", "cap"],
    variants: [
      variant("unisex", "black", [
        sz("M", "DC-BM-CP-M-BLK", 50),
        sz("L", "DC-BM-CP-L-BLK", 30),
      ]),
    ],
  },
  {
    name: "DC Tote",
    description: "Heavy-duty canvas tote with all-over DC character print.",
    price: 399,
    discountPrice: null,
    themeName: "DC",
    typeName: "Tote Bag",
    tags: ["dc", "tote", "accessories"],
    variants: [variant("unisex", "natural", [sz("M", "DC-TB-U-M-NAT", 80)])],
  },

  // ════════════════════════════════════════════════════════
  //  STRANGER THINGS — Tops (4), Bottoms (1), Headwear (1), Accessories (1)
  // ════════════════════════════════════════════════════════

  {
    name: "Hawkins High Tee",
    description:
      "Vintage-washed tee styled after the Hawkins High School merch from the show.",
    price: 649,
    discountPrice: 549,
    themeName: "Stranger Things",
    typeName: "T-Shirt",
    tags: ["strangerthings", "hawkins", "vintage", "tshirt"],
    variants: [
      variant("male", "maroon", [
        sz("S", "ST-TS-M-S-MRN", 25),
        sz("M", "ST-TS-M-M-MRN", 40),
        sz("L", "ST-TS-M-L-MRN", 35),
      ]),
      variant("female", "maroon", [
        sz("S", "ST-TS-F-S-MRN", 20),
        sz("M", "ST-TS-F-M-MRN", 30),
      ]),
      variant("kids", "maroon", [sz("S", "ST-TS-K-S-MRN", 15)]),
    ],
  },
  {
    name: "Demogorgon Tee",
    description: "Detailed Demogorgon illustration on a distressed black tee.",
    price: 599,
    discountPrice: null,
    themeName: "Stranger Things",
    typeName: "T-Shirt",
    tags: ["strangerthings", "demogorgon", "tshirt"],
    variants: [
      variant("male", "black", [
        sz("S", "ST-DM-M-S-BLK", 20),
        sz("M", "ST-DM-M-M-BLK", 35),
        sz("L", "ST-DM-M-L-BLK", 30),
        sz("XL", "ST-DM-M-XL-BLK", 15),
      ]),
      variant("female", "black", [
        sz("S", "ST-DM-F-S-BLK", 15),
        sz("M", "ST-DM-F-M-BLK", 20),
      ]),
    ],
  },
  {
    name: "Upside Down Hoodie",
    description:
      "Glow-in-the-dark Demogorgon print on a heavyweight black hoodie.",
    price: 1399,
    discountPrice: 1199,
    themeName: "Stranger Things",
    typeName: "Hoodie",
    tags: ["strangerthings", "demogorgon", "glow", "hoodie"],
    variants: [
      variant("male", "black", [
        sz("M", "ST-HD-M-M-BLK", 20),
        sz("L", "ST-HD-M-L-BLK", 30),
        sz("XL", "ST-HD-M-XL-BLK", 20),
      ]),
      variant("female", "black", [
        sz("S", "ST-HD-F-S-BLK", 15),
        sz("M", "ST-HD-F-M-BLK", 20),
      ]),
      variant("male", "red", [
        sz("M", "ST-HD-M-M-RED", 15),
        sz("L", "ST-HD-M-L-RED", 20),
      ]),
    ],
  },
  {
    name: "Hawkins Lab Sweatshirt",
    description: "Hawkins National Laboratory logo crewneck sweatshirt.",
    price: 999,
    discountPrice: 849,
    themeName: "Stranger Things",
    typeName: "Sweatshirt",
    tags: ["strangerthings", "hawkinslab", "sweatshirt"],
    variants: [
      variant("male", "grey", [
        sz("S", "ST-SW-M-S-GRY", 20),
        sz("M", "ST-SW-M-M-GRY", 35),
        sz("L", "ST-SW-M-L-GRY", 30),
      ]),
      variant("female", "grey", [
        sz("S", "ST-SW-F-S-GRY", 15),
        sz("M", "ST-SW-F-M-GRY", 25),
      ]),
      variant("male", "black", [
        sz("M", "ST-SW-M-M-BLK", 20),
        sz("L", "ST-SW-M-L-BLK", 15),
      ]),
    ],
  },
  {
    name: "Stranger Things Joggers",
    description:
      "Upside Down themed joggers with flickering lights print down the leg.",
    price: 899,
    discountPrice: 749,
    themeName: "Stranger Things",
    typeName: "Joggers",
    tags: ["strangerthings", "joggers", "bottoms"],
    variants: [
      variant("male", "black", [
        sz("S", "ST-JG-M-S-BLK", 20),
        sz("M", "ST-JG-M-M-BLK", 30),
        sz("L", "ST-JG-M-L-BLK", 25),
      ]),
      variant("female", "black", [
        sz("S", "ST-JG-F-S-BLK", 15),
        sz("M", "ST-JG-F-M-BLK", 20),
      ]),
    ],
  },
  {
    name: "Mind Flayer Cap",
    description: "Embroidered Mind Flayer silhouette on a distressed dad cap.",
    price: 549,
    discountPrice: null,
    themeName: "Stranger Things",
    typeName: "Cap",
    tags: ["strangerthings", "mindflayer", "cap"],
    variants: [
      variant("unisex", "black", [
        sz("M", "ST-CP-U-M-BLK", 50),
        sz("L", "ST-CP-U-L-BLK", 30),
      ]),
    ],
  },
  {
    name: "Starcourt Mall Tote",
    description: "Canvas tote bag featuring the iconic Starcourt Mall logo.",
    price: 449,
    discountPrice: null,
    themeName: "Stranger Things",
    typeName: "Tote Bag",
    tags: ["strangerthings", "starcourt", "tote"],
    variants: [variant("unisex", "cream", [sz("M", "ST-TB-U-M-CRM", 70)])],
  },

  // ════════════════════════════════════════════════════════
  //  HARRY POTTER — Tops (4), Bottoms (1), Headwear (2), Accessories (2)
  // ════════════════════════════════════════════════════════

  {
    name: "Hogwarts House Tee",
    description:
      "Soft ring-spun cotton tee with all four House crests printed in vintage ink.",
    price: 699,
    discountPrice: 599,
    themeName: "Harry Potter",
    typeName: "T-Shirt",
    tags: ["harrypotter", "hogwarts", "houses", "tshirt"],
    variants: [
      variant("male", "beige", [
        sz("S", "HP-TS-M-S-BGE", 20),
        sz("M", "HP-TS-M-M-BGE", 35),
        sz("L", "HP-TS-M-L-BGE", 30),
      ]),
      variant("female", "beige", [
        sz("S", "HP-TS-F-S-BGE", 25),
        sz("M", "HP-TS-F-M-BGE", 30),
        sz("L", "HP-TS-F-L-BGE", 15),
      ]),
      variant("kids", "beige", [
        sz("S", "HP-TS-K-S-BGE", 20),
        sz("M", "HP-TS-K-M-BGE", 20),
      ]),
      variant("male", "white", [
        sz("M", "HP-TS-M-M-WHT", 25),
        sz("L", "HP-TS-M-L-WHT", 20),
      ]),
      variant("female", "crimson", [
        sz("S", "HP-TS-F-S-CRM", 15),
        sz("M", "HP-TS-F-M-CRM", 20),
      ]),
    ],
  },
  {
    name: "Marauder's Map Tee",
    description: "All-over Marauder's Map print on a soft cotton tee.",
    price: 649,
    discountPrice: null,
    themeName: "Harry Potter",
    typeName: "T-Shirt",
    tags: ["harrypotter", "maraudersmap", "tshirt", "exclusive"],
    variants: [
      variant("male", "black", [
        sz("S", "HP-MM-M-S-BLK", 20),
        sz("M", "HP-MM-M-M-BLK", 30),
        sz("L", "HP-MM-M-L-BLK", 25),
      ]),
      variant("female", "black", [
        sz("S", "HP-MM-F-S-BLK", 15),
        sz("M", "HP-MM-F-M-BLK", 20),
      ]),
    ],
  },
  {
    name: "Gryffindor Hoodie",
    description:
      "Thick fleece pullover hoodie with Gryffindor crest embroidery and house colours.",
    price: 1499,
    discountPrice: 1299,
    themeName: "Harry Potter",
    typeName: "Hoodie",
    tags: ["harrypotter", "gryffindor", "hoodie", "exclusive"],
    variants: [
      variant("male", "crimson", [
        sz("M", "HP-HD-M-M-CRM", 25),
        sz("L", "HP-HD-M-L-CRM", 30),
        sz("XL", "HP-HD-M-XL-CRM", 15),
      ]),
      variant("female", "crimson", [
        sz("S", "HP-HD-F-S-CRM", 20),
        sz("M", "HP-HD-F-M-CRM", 25),
      ]),
      variant("kids", "crimson", [sz("S", "HP-HD-K-S-CRM", 15)]),
      variant("male", "navy", [
        sz("M", "HP-HD-M-M-NVY", 20),
        sz("L", "HP-HD-M-L-NVY", 15),
      ]),
    ],
  },
  {
    name: "Hogwarts Crewneck",
    description:
      "Hogwarts crest embroidered crewneck sweatshirt in classic grey.",
    price: 1099,
    discountPrice: 949,
    themeName: "Harry Potter",
    typeName: "Sweatshirt",
    tags: ["harrypotter", "hogwarts", "sweatshirt", "exclusive"],
    variants: [
      variant("male", "grey", [
        sz("S", "HP-SW-M-S-GRY", 20),
        sz("M", "HP-SW-M-M-GRY", 35),
        sz("L", "HP-SW-M-L-GRY", 30),
      ]),
      variant("female", "grey", [
        sz("S", "HP-SW-F-S-GRY", 20),
        sz("M", "HP-SW-F-M-GRY", 30),
      ]),
      variant("male", "crimson", [
        sz("M", "HP-SW-M-M-CRM", 20),
        sz("L", "HP-SW-M-L-CRM", 15),
      ]),
    ],
  },
  {
    name: "Hogwarts Joggers",
    description:
      "Hogwarts house crest joggers — comfortable enough for Quidditch practice.",
    price: 999,
    discountPrice: 849,
    themeName: "Harry Potter",
    typeName: "Joggers",
    tags: ["harrypotter", "hogwarts", "joggers", "exclusive"],
    variants: [
      variant("male", "black", [
        sz("S", "HP-JG-M-S-BLK", 20),
        sz("M", "HP-JG-M-M-BLK", 30),
        sz("L", "HP-JG-M-L-BLK", 25),
      ]),
      variant("female", "black", [
        sz("S", "HP-JG-F-S-BLK", 15),
        sz("M", "HP-JG-F-M-BLK", 20),
      ]),
      variant("male", "grey", [
        sz("M", "HP-JG-M-M-GRY", 20),
        sz("L", "HP-JG-M-L-GRY", 15),
      ]),
    ],
  },
  {
    name: "Platform 9¾ Beanie",
    description:
      "Chunky-knit beanie with woven Platform 9¾ patch — perfect for winter.",
    price: 599,
    discountPrice: null,
    themeName: "Harry Potter",
    typeName: "Beanie",
    tags: ["harrypotter", "platform934", "beanie", "exclusive"],
    variants: [
      variant("unisex", "grey", [sz("M", "HP-BN-U-M-GRY", 40)]),
      variant("unisex", "maroon", [sz("M", "HP-BN-U-M-MRN", 35)]),
    ],
  },
  {
    name: "Sorting Hat Cap",
    description: "Embroidered Sorting Hat cap — let fate decide your house.",
    price: 549,
    discountPrice: null,
    themeName: "Harry Potter",
    typeName: "Cap",
    tags: ["harrypotter", "sortinghat", "cap", "exclusive"],
    variants: [
      variant("unisex", "black", [
        sz("M", "HP-SH-CP-M-BLK", 40),
        sz("L", "HP-SH-CP-L-BLK", 25),
      ]),
    ],
  },
  {
    name: "Hogwarts Mug",
    description:
      "Heat-reactive magic reveal mug — Hogwarts crest appears when filled with hot liquid.",
    price: 449,
    discountPrice: null,
    themeName: "Harry Potter",
    typeName: "Mug",
    tags: ["harrypotter", "hogwarts", "mug", "exclusive"],
    variants: [variant("unisex", "black", [sz("M", "HP-MG-U-M-BLK", 100)])],
  },
  {
    name: "Marauder's Map Tote",
    description:
      "Canvas tote printed with the Marauder's Map — I solemnly swear it carries a lot.",
    price: 499,
    discountPrice: 399,
    themeName: "Harry Potter",
    typeName: "Tote Bag",
    tags: ["harrypotter", "maraudersmap", "tote", "exclusive"],
    variants: [
      variant("unisex", "parchment", [sz("M", "HP-TB-U-M-PRC", 60)]),
      variant("unisex", "natural", [sz("M", "HP-TB-U-M-NAT", 40)]),
    ],
  },

  // ════════════════════════════════════════════════════════
  //  MARVEL — Tops (4), Bottoms (2), Headwear (2), Accessories (1)
  // ════════════════════════════════════════════════════════

  {
    name: "Avengers Assemble Tee",
    description:
      "All-over Avengers logo scatter print on a premium cotton tee.",
    price: 649,
    discountPrice: 549,
    themeName: "Marvel",
    typeName: "T-Shirt",
    tags: ["marvel", "avengers", "tshirt", "graphic"],
    variants: [
      variant("male", "white", [
        sz("S", "MV-TS-M-S-WHT", 30),
        sz("M", "MV-TS-M-M-WHT", 50),
        sz("L", "MV-TS-M-L-WHT", 45),
        sz("XL", "MV-TS-M-XL-WHT", 25),
      ]),
      variant("female", "white", [
        sz("S", "MV-TS-F-S-WHT", 25),
        sz("M", "MV-TS-F-M-WHT", 35),
      ]),
      variant("kids", "red", [
        sz("S", "MV-TS-K-S-RED", 20),
        sz("M", "MV-TS-K-M-RED", 25),
      ]),
      variant("male", "black", [
        sz("M", "MV-TS-M-M-BLK", 30),
        sz("L", "MV-TS-M-L-BLK", 25),
      ]),
    ],
  },
  {
    name: "Spider-Man Web Tee",
    description: "Web-shooter graphic tee with reflective thread detailing.",
    price: 599,
    discountPrice: null,
    themeName: "Marvel",
    typeName: "T-Shirt",
    tags: ["marvel", "spiderman", "tshirt"],
    variants: [
      variant("male", "red", [
        sz("S", "MV-SP-M-S-RED", 25),
        sz("M", "MV-SP-M-M-RED", 40),
        sz("L", "MV-SP-M-L-RED", 35),
      ]),
      variant("female", "red", [
        sz("S", "MV-SP-F-S-RED", 20),
        sz("M", "MV-SP-F-M-RED", 25),
      ]),
      variant("kids", "red", [
        sz("S", "MV-SP-K-S-RED", 20),
        sz("M", "MV-SP-K-M-RED", 25),
      ]),
      variant("male", "black", [
        sz("M", "MV-SP-M-M-BLK", 25),
        sz("L", "MV-SP-M-L-BLK", 20),
      ]),
    ],
  },
  {
    name: "Shield Agent Hoodie",
    description:
      "SHIELD logo embroidered hoodie in tactical olive — feel like a field agent.",
    price: 1349,
    discountPrice: 1149,
    themeName: "Marvel",
    typeName: "Hoodie",
    tags: ["marvel", "shield", "hoodie"],
    variants: [
      variant("male", "olive", [
        sz("M", "MV-HD-M-M-OLV", 20),
        sz("L", "MV-HD-M-L-OLV", 30),
        sz("XL", "MV-HD-M-XL-OLV", 20),
      ]),
      variant("female", "olive", [
        sz("S", "MV-HD-F-S-OLV", 15),
        sz("M", "MV-HD-F-M-OLV", 20),
      ]),
      variant("male", "charcoal", [
        sz("M", "MV-HD-M-M-CHR", 20),
        sz("L", "MV-HD-M-L-CHR", 15),
      ]),
    ],
  },
  {
    name: "Iron Man Arc Reactor Sweatshirt",
    description: "Arc reactor glow-print crewneck — power up your wardrobe.",
    price: 1099,
    discountPrice: 949,
    themeName: "Marvel",
    typeName: "Sweatshirt",
    tags: ["marvel", "ironman", "sweatshirt"],
    variants: [
      variant("male", "grey", [
        sz("S", "MV-SW-M-S-GRY", 20),
        sz("M", "MV-SW-M-M-GRY", 35),
        sz("L", "MV-SW-M-L-GRY", 30),
      ]),
      variant("female", "grey", [
        sz("S", "MV-SW-F-S-GRY", 15),
        sz("M", "MV-SW-F-M-GRY", 25),
      ]),
      variant("male", "black", [
        sz("M", "MV-SW-M-M-BLK", 25),
        sz("L", "MV-SW-M-L-BLK", 20),
      ]),
      variant("female", "red", [
        sz("S", "MV-SW-F-S-RED", 15),
        sz("M", "MV-SW-F-M-RED", 20),
      ]),
    ],
  },
  {
    name: "Stark Industries Joggers",
    description:
      "Slim-fit fleece joggers with Stark Industries wordmark down the left leg.",
    price: 999,
    discountPrice: 849,
    themeName: "Marvel",
    typeName: "Joggers",
    tags: ["marvel", "ironman", "stark", "joggers"],
    variants: [
      variant("male", "black", [
        sz("S", "MV-JG-M-S-BLK", 25),
        sz("M", "MV-JG-M-M-BLK", 35),
        sz("L", "MV-JG-M-L-BLK", 30),
      ]),
      variant("female", "black", [
        sz("S", "MV-JG-F-S-BLK", 20),
        sz("M", "MV-JG-F-M-BLK", 25),
      ]),
      variant("male", "grey", [
        sz("M", "MV-JG-M-M-GRY", 20),
        sz("L", "MV-JG-M-L-GRY", 15),
      ]),
    ],
  },
  {
    name: "Black Panther Shorts",
    description:
      "Wakanda Forever woven-label shorts with camo Vibranium print.",
    price: 799,
    discountPrice: 649,
    themeName: "Marvel",
    typeName: "Shorts",
    tags: ["marvel", "blackpanther", "wakanda", "shorts"],
    variants: [
      variant("male", "black", [
        sz("S", "MV-SH-M-S-BLK", 20),
        sz("M", "MV-SH-M-M-BLK", 30),
        sz("L", "MV-SH-M-L-BLK", 25),
      ]),
      variant("female", "black", [
        sz("S", "MV-SH-F-S-BLK", 15),
        sz("M", "MV-SH-F-M-BLK", 20),
      ]),
    ],
  },
  {
    name: "Spider-Man Snapback",
    description: "Classic Spider-Man web pattern snapback with flat brim.",
    price: 549,
    discountPrice: null,
    themeName: "Marvel",
    typeName: "Cap",
    tags: ["marvel", "spiderman", "cap", "snapback"],
    variants: [
      variant("unisex", "red", [sz("M", "MV-CP-U-M-RED", 45)]),
      variant("unisex", "black", [sz("M", "MV-CP-U-M-BLK", 45)]),
    ],
  },
  {
    name: "Avengers Beanie",
    description: "A-logo knit beanie — assemble your winter look.",
    price: 449,
    discountPrice: null,
    themeName: "Marvel",
    typeName: "Beanie",
    tags: ["marvel", "avengers", "beanie"],
    variants: [
      variant("unisex", "black", [sz("M", "MV-BN-U-M-BLK", 50)]),
      variant("unisex", "red", [sz("M", "MV-BN-U-M-RED", 35)]),
    ],
  },
  {
    name: "Marvel Hero Tote",
    description:
      "Reusable cotton tote with character collage artwork — Iron Man to Black Panther.",
    price: 399,
    discountPrice: null,
    themeName: "Marvel",
    typeName: "Tote Bag",
    tags: ["marvel", "tote", "accessories"],
    variants: [
      variant("unisex", "natural", [sz("M", "MV-TB-U-M-NAT", 90)]),
      variant("unisex", "black", [sz("M", "MV-TB-U-M-BLK", 60)]),
    ],
  },

  // ════════════════════════════════════════════════════════
  //  REGULAR — Tops (3), Bottoms (2), Footwear (2), Headwear (2), Accessories (2)
  // ════════════════════════════════════════════════════════

  {
    name: "Essential Everyday Tee",
    description:
      "Ultra-soft 180gsm Supima cotton tee. No logo. No noise. Just a great tee.",
    price: 449,
    discountPrice: null,
    themeName: "Regular",
    typeName: "T-Shirt",
    tags: ["regular", "essential", "basic", "tshirt"],
    variants: [
      variant("male", "white", [
        sz("S", "RG-TS-M-S-WHT", 50),
        sz("M", "RG-TS-M-M-WHT", 80),
        sz("L", "RG-TS-M-L-WHT", 70),
        sz("XL", "RG-TS-M-XL-WHT", 40),
      ]),
      variant("male", "black", [
        sz("S", "RG-TS-M-S-BLK", 50),
        sz("M", "RG-TS-M-M-BLK", 80),
        sz("L", "RG-TS-M-L-BLK", 70),
      ]),
      variant("male", "grey", [
        sz("M", "RG-TS-M-M-GRY", 40),
        sz("L", "RG-TS-M-L-GRY", 35),
      ]),
      variant("male", "navy", [
        sz("M", "RG-TS-M-M-NVY", 35),
        sz("L", "RG-TS-M-L-NVY", 30),
      ]),
      variant("female", "white", [
        sz("S", "RG-TS-F-S-WHT", 40),
        sz("M", "RG-TS-F-M-WHT", 60),
      ]),
      variant("female", "black", [
        sz("S", "RG-TS-F-S-BLK", 40),
        sz("M", "RG-TS-F-M-BLK", 60),
      ]),
      variant("female", "olive", [
        sz("S", "RG-TS-F-S-OLV", 25),
        sz("M", "RG-TS-F-M-OLV", 30),
      ]),
      variant("kids", "white", [
        sz("S", "RG-TS-K-S-WHT", 30),
        sz("M", "RG-TS-K-M-WHT", 30),
      ]),
    ],
  },
  {
    name: "Everyday Hoodie",
    description:
      "Brushed fleece pullover hoodie with a kangaroo pocket. The only hoodie you need.",
    price: 1199,
    discountPrice: 999,
    themeName: "Regular",
    typeName: "Hoodie",
    tags: ["regular", "hoodie", "essential"],
    variants: [
      variant("male", "grey", [
        sz("M", "RG-HD-M-M-GRY", 40),
        sz("L", "RG-HD-M-L-GRY", 50),
        sz("XL", "RG-HD-M-XL-GRY", 30),
      ]),
      variant("male", "black", [
        sz("M", "RG-HD-M-M-BLK", 40),
        sz("L", "RG-HD-M-L-BLK", 50),
      ]),
      variant("male", "navy", [
        sz("M", "RG-HD-M-M-NVY", 25),
        sz("L", "RG-HD-M-L-NVY", 20),
      ]),
      variant("female", "grey", [
        sz("S", "RG-HD-F-S-GRY", 30),
        sz("M", "RG-HD-F-M-GRY", 40),
      ]),
      variant("female", "pink", [
        sz("S", "RG-HD-F-S-PNK", 30),
        sz("M", "RG-HD-F-M-PNK", 35),
      ]),
      variant("female", "black", [
        sz("S", "RG-HD-F-S-BLK", 25),
        sz("M", "RG-HD-F-M-BLK", 30),
      ]),
      variant("kids", "grey", [sz("S", "RG-HD-K-S-GRY", 20)]),
    ],
  },
  {
    name: "Classic Crewneck Sweatshirt",
    description:
      "300gsm cotton-fleece crewneck — the foundation of every great outfit.",
    price: 999,
    discountPrice: 849,
    themeName: "Regular",
    typeName: "Sweatshirt",
    tags: ["regular", "sweatshirt", "essential"],
    variants: [
      variant("male", "grey", [
        sz("S", "RG-SW-M-S-GRY", 30),
        sz("M", "RG-SW-M-M-GRY", 50),
        sz("L", "RG-SW-M-L-GRY", 45),
        sz("XL", "RG-SW-M-XL-GRY", 25),
      ]),
      variant("male", "black", [
        sz("M", "RG-SW-M-M-BLK", 40),
        sz("L", "RG-SW-M-L-BLK", 35),
      ]),
      variant("male", "white", [
        sz("M", "RG-SW-M-M-WHT", 30),
        sz("L", "RG-SW-M-L-WHT", 25),
      ]),
      variant("female", "grey", [
        sz("S", "RG-SW-F-S-GRY", 25),
        sz("M", "RG-SW-F-M-GRY", 40),
      ]),
      variant("female", "cream", [
        sz("S", "RG-SW-F-S-CRM", 20),
        sz("M", "RG-SW-F-M-CRM", 30),
      ]),
      variant("kids", "grey", [
        sz("S", "RG-SW-K-S-GRY", 20),
        sz("M", "RG-SW-K-M-GRY", 20),
      ]),
    ],
  },
  {
    name: "Flex Joggers",
    description:
      "4-way stretch joggers with deep side pockets and a tapered ankle.",
    price: 899,
    discountPrice: 749,
    themeName: "Regular",
    typeName: "Joggers",
    tags: ["regular", "joggers", "bottoms", "athleisure"],
    variants: [
      variant("male", "black", [
        sz("S", "RG-JG-M-S-BLK", 30),
        sz("M", "RG-JG-M-M-BLK", 50),
        sz("L", "RG-JG-M-L-BLK", 45),
      ]),
      variant("male", "grey", [
        sz("M", "RG-JG-M-M-GRY", 30),
        sz("L", "RG-JG-M-L-GRY", 25),
      ]),
      variant("male", "navy", [
        sz("M", "RG-JG-M-M-NVY", 20),
        sz("L", "RG-JG-M-L-NVY", 15),
      ]),
      variant("female", "black", [
        sz("S", "RG-JG-F-S-BLK", 30),
        sz("M", "RG-JG-F-M-BLK", 40),
      ]),
      variant("female", "olive", [
        sz("S", "RG-JG-F-S-OLV", 20),
        sz("M", "RG-JG-F-M-OLV", 25),
      ]),
      variant("female", "grey", [
        sz("S", "RG-JG-F-S-GRY", 15),
        sz("M", "RG-JG-F-M-GRY", 20),
      ]),
    ],
  },
  {
    name: "Summer Shorts",
    description:
      "Lightweight mesh-lined shorts with an elastic waistband — beach to street.",
    price: 699,
    discountPrice: null,
    themeName: "Regular",
    typeName: "Shorts",
    tags: ["regular", "shorts", "summer", "bottoms"],
    variants: [
      variant("male", "khaki", [
        sz("S", "RG-SH-M-S-KHK", 25),
        sz("M", "RG-SH-M-M-KHK", 35),
        sz("L", "RG-SH-M-L-KHK", 30),
      ]),
      variant("male", "black", [
        sz("S", "RG-SH-M-S-BLK", 25),
        sz("M", "RG-SH-M-M-BLK", 30),
        sz("L", "RG-SH-M-L-BLK", 20),
      ]),
      variant("male", "navy", [
        sz("M", "RG-SH-M-M-NVY", 20),
        sz("L", "RG-SH-M-L-NVY", 15),
      ]),
      variant("female", "khaki", [
        sz("S", "RG-SH-F-S-KHK", 20),
        sz("M", "RG-SH-F-M-KHK", 25),
      ]),
      variant("female", "grey", [
        sz("S", "RG-SH-F-S-GRY", 15),
        sz("M", "RG-SH-F-M-GRY", 20),
      ]),
    ],
  },
  {
    name: "Clean Runner Sneakers",
    description: "Minimalist all-white mesh sneakers with cushioned EVA sole.",
    price: 1999,
    discountPrice: 1699,
    themeName: "Regular",
    typeName: "Sneakers",
    tags: ["regular", "sneakers", "footwear", "minimal"],
    variants: [
      variant("male", "white", [
        sz("M", "RG-SN-M-M-WHT", 20),
        sz("L", "RG-SN-M-L-WHT", 25),
        sz("XL", "RG-SN-M-XL-WHT", 15),
      ]),
      variant("male", "black", [
        sz("M", "RG-SN-M-M-BLK", 20),
        sz("L", "RG-SN-M-L-BLK", 15),
      ]),
      variant("female", "white", [
        sz("S", "RG-SN-F-S-WHT", 20),
        sz("M", "RG-SN-F-M-WHT", 25),
      ]),
    ],
  },
  {
    name: "No-Show Socks (3-Pack)",
    description:
      "Cushioned no-show socks in a 3-pack. Anti-slip heel grip. Machine washable.",
    price: 299,
    discountPrice: null,
    themeName: "Regular",
    typeName: "Socks",
    tags: ["regular", "socks", "footwear", "basics"],
    variants: [
      variant("unisex", "white", [
        sz("S", "RG-SK-U-S-WHT", 100),
        sz("M", "RG-SK-U-M-WHT", 100),
        sz("L", "RG-SK-U-L-WHT", 80),
      ]),
      variant("unisex", "black", [
        sz("S", "RG-SK-U-S-BLK", 80),
        sz("M", "RG-SK-U-M-BLK", 80),
        sz("L", "RG-SK-U-L-BLK", 60),
      ]),
      variant("unisex", "grey", [
        sz("S", "RG-SK-U-S-GRY", 50),
        sz("M", "RG-SK-U-M-GRY", 50),
      ]),
    ],
  },
  {
    name: "Classic Snapback Cap",
    description: "6-panel cotton snapback with a clean tonal embroidered logo.",
    price: 499,
    discountPrice: null,
    themeName: "Regular",
    typeName: "Cap",
    tags: ["regular", "cap", "headwear"],
    variants: [
      variant("unisex", "black", [
        sz("M", "RG-CP-U-M-BLK", 60),
        sz("L", "RG-CP-U-L-BLK", 40),
      ]),
      variant("unisex", "white", [sz("M", "RG-CP-U-M-WHT", 40)]),
      variant("unisex", "olive", [sz("M", "RG-CP-U-M-OLV", 30)]),
      variant("unisex", "navy", [sz("M", "RG-CP-U-M-NVY", 35)]),
    ],
  },
  {
    name: "Ribbed Beanie",
    description:
      "Chunky ribbed beanie in 100% acrylic — warm, stretchy, one size fits most.",
    price: 349,
    discountPrice: null,
    themeName: "Regular",
    typeName: "Beanie",
    tags: ["regular", "beanie", "headwear", "winter"],
    variants: [
      variant("unisex", "black", [sz("M", "RG-BN-U-M-BLK", 50)]),
      variant("unisex", "grey", [sz("M", "RG-BN-U-M-GRY", 40)]),
      variant("unisex", "cream", [sz("M", "RG-BN-U-M-CRM", 30)]),
      variant("unisex", "navy", [sz("M", "RG-BN-U-M-NVY", 30)]),
    ],
  },
  {
    name: "Canvas Everyday Tote",
    description:
      "12oz natural canvas tote. Fits a laptop, groceries, or everything in between.",
    price: 349,
    discountPrice: null,
    themeName: "Regular",
    typeName: "Tote Bag",
    tags: ["regular", "tote", "accessories", "everyday"],
    variants: [
      variant("unisex", "natural", [sz("M", "RG-TB-U-M-NAT", 120)]),
      variant("unisex", "black", [sz("M", "RG-TB-U-M-BLK", 80)]),
      variant("unisex", "grey", [sz("M", "RG-TB-U-M-GRY", 50)]),
    ],
  },
  {
    name: "Ceramic Everyday Mug",
    description:
      "350ml ceramic mug with a comfortable D-handle. Dishwasher safe.",
    price: 299,
    discountPrice: null,
    themeName: "Regular",
    typeName: "Mug",
    tags: ["regular", "mug", "accessories"],
    variants: [
      variant("unisex", "white", [sz("M", "RG-MG-U-M-WHT", 80)]),
      variant("unisex", "black", [sz("M", "RG-MG-U-M-BLK", 60)]),
      variant("unisex", "cream", [sz("M", "RG-MG-U-M-CRM", 50)]),
    ],
  },
];
