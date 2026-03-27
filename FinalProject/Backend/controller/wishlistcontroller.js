import wishlistModel from "../models/wishlistSchema.js";
import productModel from "../models/productSchema.js";

const getUserId = (req) => req?.body?.userId || req?.query?.userId;

//! GET /api/wishlist?userId=abc123
export const getWishlist = async (req, res) => {
  try {
    console.log("Query Params:", req.query); // Debug line
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId is required" });

    let wishlist = await wishlistModel.findOne({ userId }).populate({
      path: "items.productId",
      select: "name price discountPrice variants isActive",
    });

    if (!wishlist) {
      wishlist = await wishlistModel.create({ userId, items: [] });
    }

    res.status(200).json({ wishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! POST /api/wishlist
//? Body: { userId, productId, variantId,size }
export const addToWishlist = async (req, res) => {
  try {
    const { productId, variantId, size, themeId } = req.body;
    const userId = getUserId(req);

    if (!userId) return res.status(400).json({ message: "userId is required" });

    // 1. Validate Product & Variant
    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const variant = product.variants.id(variantId);
    if (!variant) return res.status(404).json({ message: "Variant not found" });

    // 2. Find or Create Wishlist
    let wishlist = await wishlistModel.findOne({ userId });
    if (!wishlist) {
      // NOTE: If your schema still has themeId at the top level as 'required',
      // you must pass a default or the first themeId here to avoid a 500 error.
      wishlist = await wishlistModel.create({ userId, items: [] });
    }

    // 3. Check for duplicates
    const alreadyAdded = wishlist.items.some(
      (item) =>
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId,
    );

    if (alreadyAdded)
      return res.status(400).json({ message: "Already in wishlist" });

    // 4. Push with themeId
    // This ensures the specific theme of THIS product is saved in the array
    wishlist.items.push({
      productId,
      variantId,
      size,
      themeId: themeId, // Fallback to product's default theme if not sent
    });

    await wishlist.save();
    res.status(200).json({ wishlist });
  } catch (err) {
    console.error("Wishlist Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

//! DELETE /api/wishlist/:productId/:variantId/:size
// ?Body: { userId }
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId, variantId, size } = req.params;
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const wishlist = await wishlistModel.findOne({ userId });
    if (!wishlist)
      return res.status(404).json({ message: "Wishlist not found" });

    // Filter out the specific item
    const initialLength = wishlist.items.length;

    wishlist.items = wishlist.items.filter((item) => {
      return !(
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId &&
        item.size === size
      );
    });

    if (wishlist.items.length === initialLength) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    await wishlist.save();
    res.status(200).json({ wishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! DELETE /api/wishlist
//? Body: { userId }
export const clearWishlist = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const wishlist = await wishlistModel.findOne({ userId });
    if (!wishlist)
      return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = [];
    await wishlist.save();
    res.status(200).json({ message: "Wishlist cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
