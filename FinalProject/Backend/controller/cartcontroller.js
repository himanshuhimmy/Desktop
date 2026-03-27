import cartModel from "../models/cartSchema.js";
import orderModel from "../models/orderSchema.js";
import productModel from "../models/productSchema.js";

const getUserId = (req) => req?.body?.userId || req?.query?.userId;

const getActiveCart = async (userId) => {
  let cart = await cartModel.findOne({
    userId,
    isDeleted: false,
    isOrdered: false,
  });
  if (!cart) cart = await cartModel.create({ userId, items: [] });
  return cart;
};

// GET /api/cart?userId=abc123
export const getCart = async (req, res) => {
  try {
    console.log("Query Params:", req.query);
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const cart = await getActiveCart(userId);
    await cart.populate({
      path: "items.productId",
      select: "name price discountPrice variants",
    });

    res.status(200).json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! POST /api/cart/items
export const addItem = async (req, res) => {
  try {
    const { productId, variantId, size, quantity = 1 } = req.body;
    const userId = getUserId(req);

    if (!userId) return res.status(400).json({ message: "userId is required" });
    if (!size) return res.status(400).json({ message: "size is required" });

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const variant = product.variants.id(variantId);
    if (!variant) return res.status(404).json({ message: "Variant not found" });

    const sizeEntry = variant.sizes.find((s) => s.size === size);
    if (!sizeEntry) return res.status(404).json({ message: "Size not found" });

    if (sizeEntry.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    const cart = await getActiveCart(userId);

    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId &&
        item.size === size,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, variantId, size, quantity });
    }

    await cart.save();
    res.status(200).json({ cart });
  } catch (err) {
    console.log("CART ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};

//! PATCH /api/cart/items/:variantId
export const updateItemQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { variantId, size } = req.params;

    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const cart = await getActiveCart(userId);

    const item = cart.items.find(
      (i) => i.variantId.toString() === variantId && i.size === size,
    );

    if (!item) return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => !(i.variantId.toString() === variantId && i.size === size),
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res.status(200).json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! DELETE /api/cart/items/:variantId/:size
export const removeItem = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { variantId, size } = req.params;

    if (!userId) return res.status(400).json({ message: "userId is required" });

    const cart = await getActiveCart(userId);

    const initialLength = cart.items.length;

    cart.items = cart.items.filter(
      (i) => !(i.variantId.toString() === variantId && i.size === size),
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Item not found" });
    }

    await cart.save();
    res.status(200).json({ cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/cart
export const clearCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const cart = await getActiveCart(userId);
    cart.isDeleted = true;
    cart.deletedAt = new Date();
    await cart.save();
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/cart/checkout
export const checkout = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const cart = await getActiveCart(userId);
    if (cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = await productModel.findById(item.productId);
      if (!product) continue;
      const variant = product.variants.id(item.variantId);
      if (!variant) continue;
      const price = product.discountPrice ?? product.price;
      orderItems.push({
        productId: product._id,
        variantId: variant._id,
        quantity: item.quantity,
        priceAtPurchase: price,
        nameAtPurchase: product.name,
        variantSnapshot: {
          gender: variant.gender,
          color: variant.color,
          size: item.size,
        },
      });
      totalAmount += price * item.quantity;
    }

    const order = await orderModel.create({
      userId,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      placedAt: new Date(),
    });

    cart.isOrdered = true;
    cart.orderId = order._id;
    cart.orderedAt = new Date();
    await cart.save();

    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
