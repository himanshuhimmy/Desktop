// Central export barrel — import any model from this one file:
//
//   import { userModel, productModel, cartModel } from "./models/index.js";
//
// Adding a new model:
//   1. Create  models/yourThing.model.js
//   2. Add one export line below — nothing else changes.

export { default as adminModel } from "./adminSchema.js";
export { default as membershipModel } from "./membershipSchema.js";
export { default as userModel } from "./userSchema.js";
export { default as categoryModel } from "./categorySchema.js";
export { default as productTypeModel } from "./productTypeSchema.js";
export { default as productThemeModel } from "./productThemeSchema.js";
export { default as productModel } from "./productSchema.js";
export { default as orderModel } from "./orderSchema.js";
export { default as cartModel } from "./cartSchema.js";
export { default as wishlistModel } from "./wishlistSchema.js";
export { default as addressModel } from "./addressSchema";
