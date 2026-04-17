import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controller/wishlistcontroller.js";
import { requireAuth } from "../middleware/authmiddleware.js";

const router = express.Router();

router.use(requireAuth);
router.get("/", getWishlist);
router.post("/", addToWishlist);
router.delete("/:productId/:variantId/:size", removeFromWishlist);
router.delete("/", clearWishlist);

export default router;
