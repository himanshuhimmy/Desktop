import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = "http://localhost:5000/api";

export const fetchMembershipInfo = createAsyncThunk(
  "app/fetchMembershipInfo",
  async () => {
    const res = await axios.get(`${BASE}/memberships`);
    return res.data;
  },
);

export const fetchAllThemes = createAsyncThunk(
  "app/fetchAllThemes",
  async () => {
    const res = await axios.get(`${BASE}/themes`);
    return res.data;
  },
);

export const fetchAllCategories = createAsyncThunk(
  "app/fetchAllCategories",
  async () => {
    const res = await axios.get(`${BASE}/categories`);
    return res.data;
  },
);

export const fetchAllProducts = createAsyncThunk(
  "app/fetchAllProducts",
  async () => {
    const res = await axios.get(`${BASE}/products`);
    return res.data;
  },
);

export const fetchSelectedProduct = createAsyncThunk(
  "app/fetchSelectedProduct",
  async (productId) => {
    const res = await axios.get(`${BASE}/products/${productId}`);
    return res.data;
  },
);

export const fetchUserWishlist = createAsyncThunk(
  "app/fetchUserWishlist",
  async (userId) => {
    const res = await axios.get(`${BASE}/wishlist?userId=${userId}`);
    return res.data;
  },
);

export const fetchUserCart = createAsyncThunk(
  "app/fetchUserCart",
  async (userId) => {
    const res = await axios.get(`${BASE}/cart?userId=${userId}`);
    return res.data;
  },
);

export const fetchUserOrders = createAsyncThunk(
  "app/fetchUserOrders",
  async (userId) => {
    const res = await axios.get(`${BASE}/orders?userId=${userId}`);
    return res.data;
  },
);

export const fetchUserAddress = createAsyncThunk(
  "app/fetchUserAddress",
  async (userId) => {
    const res = await axios.get(`${BASE}/users/${userId}`);
    return res.data;
  },
);
