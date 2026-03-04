import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { collection: "AdminInfo" },
);

const memebershipSchema = new mongoose.Schema(
  {
    price: Number,
    duration: String,
    discount: String,
    tear: String,
  },
  { collection: "membershipinfo" },
);

const userSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    address: {
      home: String,
      office: String,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `membershipinfo`,
      required: true,
    },
  },
  { collection: "Users" },
);

let categorySchema = new mongoose.Schema(
  {
    cat: "string",
  },
  { collection: "categorys" },
);

let productTypeSchema = new mongoose.Schema(
  {
    type: String,
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `categorys`,
      required: true,
    },
  },
  { collection: "producttypes" },
);

let productThemeSchema = new mongoose.Schema(
  {
    theme: String,
    exclusive: Boolean,
  },
  { collection: "producttheme" },
);

let productSchema = new mongoose.Schema(
  {
    quantity: Number,
    price: Number,
    size: String,
    themeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `producttheme`,
      required: true,
    },
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `categorys`,
      required: true,
    },
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `producttypes`,
      required: true,
    },
  },
  { collection: "product" },
);

let cartDataSchema = new mongoose.Schema(
  {
    date: Date,
    ordered: Boolean,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: Number,
      },
    ],
  },
  { collection: "cartdata" },
);

export const adminModel = mongoose.model("AdminInfo", adminSchema);
export const userModel = mongoose.model("Users", userSchema);
export const membershipModel = mongoose.model(
  "membershipinfo",
  memebershipSchema,
);
export const categoryModel = mongoose.model("categorys", categorySchema);
export const productTypeModel = mongoose.model(
  "producttypes",
  productTypeSchema,
);
export const productThemeModel = mongoose.model(
  "producttheme",
  productThemeSchema,
);

export const productModel = mongoose.model("product", productSchema);
export const cartModel = mongoose.model("cartdata", cartDataSchema);
