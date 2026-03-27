// import mongoose from "mongoose";

// const adminSchema = new mongoose.Schema(
//   {
//     username: String,
//     password: String,
//     securityCode: Number,
//   },
//   { collection: "AdminInfo" },
// );

// const memebershipSchema = new mongoose.Schema(
//   {
//     price: Number,
//     duration: String,
//     discount: String,
//     tear: String,
//     perks: Array,
//   },
//   { collection: "membershipinfo" },
// );

// const userSchema = new mongoose.Schema(
//   {
//     name: String,
//     password: String,
//     address: {
//       home: { type: String, required: false },
//       office: { type: String, required: false },
//     },
//     plan: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: `membershipinfo`,
//       required: true,
//     },

//     email: String,
//   },
//   { collection: "Users" },
// );

// let categorySchema = new mongoose.Schema(
//   {
//     cat: String,
//   },
//   { collection: "categorys" },
// );

// let productTypeSchema = new mongoose.Schema(
//   {
//     type: String,
//     catId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: `categorys`,
//       required: true,
//     },
//   },
//   { collection: "producttypes" },
// );

// let productThemeSchema = new mongoose.Schema(
//   {
//     theme: String,
//     exclusive: Boolean,
//   },
//   { collection: "producttheme" },
// );

// const variantSchema = new mongoose.Schema(
//   {
//     gender: {
//       type: String,
//       enum: ["male", "female", "kids"],
//       required: true,
//     },

//     size: {
//       type: String,
//       enum: ["S", "M", "L", "XL"],
//       required: true,
//     },

//     stock: {
//       type: Number,
//       required: true,
//     },

//     images: {
//       display: {
//         type: String,
//         required: true,
//       },

//       poses: [
//         {
//           type: String,
//         },
//       ],
//     },
//   },
//   { _id: false },
// );

// let productSchema = new mongoose.Schema(
//   {
//     price: {
//       type: Number,
//       required: true,
//     },

//     variants: [variantSchema],

//     themeId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "producttheme",
//       required: true,
//     },

//     catId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "categorys",
//       required: true,
//     },

//     typeId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "producttypes",
//       required: true,
//     },
//   },
//   { collection: "product" },
// );

// let cartDataSchema = new mongoose.Schema(
//   {
//     date: Date,
//     ordered: Boolean,
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Users",
//       required: true,
//     },
//     products: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "product",
//           required: true,
//         },
//         quantity: Number,
//       },
//     ],
//   },
//   { collection: "cartdata" },
// );

// const wishlistSchema = new mongoose.Schema(
//   [
//     {
//       userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Users",
//         required: true,
//       },
//       list: [
//         {
//           productId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "product",
//             required: true,
//           },
//         },
//       ],
//     },
//   ],
//   { collection: "Wishlist" },
// );

// export const adminModel = mongoose.model("AdminInfo", adminSchema);
// export const userModel = mongoose.model("Users", userSchema);
// export const membershipModel = mongoose.model(
//   "membershipinfo",
//   memebershipSchema,
// );
// export const categoryModel = mongoose.model("categorys", categorySchema);
// export const productTypeModel = mongoose.model(
//   "producttypes",
//   productTypeSchema,
// );
// export const productThemeModel = mongoose.model(
//   "producttheme",
//   productThemeSchema,
// );

// export const productModel = mongoose.model("product", productSchema);
// export const cartModel = mongoose.model("cartdata", cartDataSchema);
// export const wishlistModel = mongoose.model("Wishlist", wishlistSchema);
