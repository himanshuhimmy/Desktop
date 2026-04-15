import express from "express";
import {
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
  checkout,
  checkoutSingleItem,
} from "../controller/cartcontroller.js";

const router = express.Router();

router.get("/", getCart);
router.post("/items", addItem);

router.patch("/items/:variantId/:size", updateItemQuantity);
router.delete("/items/:variantId/:size", removeItem);
router.delete("/", clearCart);
router.post("/checkout-item", checkoutSingleItem);
router.post("/checkout", checkout);

export default router;
