import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const fetchMembershipInfo = createAsyncThunk(
  "app/fetchMembershipInfo",
  async () => {
    const res = await api.get("/memberships");
    return res.data;
  },
);

export const fetchAllThemes = createAsyncThunk(
  "app/fetchAllThemes",
  async () => {
    const res = await api.get("/themes");
    return res.data;
  },
);

export const fetchAllCategories = createAsyncThunk(
  "app/fetchAllCategories",
  async () => {
    const res = await api.get("/categories");
    return res.data;
  },
);

export const fetchAllProducts = createAsyncThunk(
  "app/fetchAllProducts",
  async () => {
    const res = await api.get("/products");
    return res.data;
  },
);

export const fetchSelectedProduct = createAsyncThunk(
  "app/fetchSelectedProduct",
  async (productId) => {
    const res = await api.get(`/products/${productId}`);
    return res.data;
  },
);

export const fetchUserWishlist = createAsyncThunk(
  "app/fetchUserWishlist",
  async (userId) => {
    const res = await api.get(`/wishlist?userId=${userId}`);
    return res.data;
  },
);

export const fetchUserCart = createAsyncThunk(
  "app/fetchUserCart",
  async (userId) => {
    const res = await api.get(`/cart?userId=${userId}`);
    return res.data;
  },
);

export const fetchUserOrders = createAsyncThunk(
  "app/fetchUserOrders",
  async (userId) => {
    const res = await api.get(`/orders?userId=${userId}`);
    return res.data;
  },
);

export const fetchUserAddress = createAsyncThunk(
  "app/fetchUserAddress",
  async (userId) => {
    const res = await api.get(`/users/${userId}`);
    return res.data;
  },
);
