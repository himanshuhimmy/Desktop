import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = "http://localhost:5000/api";

export const fetchProductTypes = createAsyncThunk(
  "admin/fetchProductTypes",
  async () => {
    const res = await axios.get(`${BASE}/producttypes`);
    return res.data;
  },
);

export const fetchAllOrders = createAsyncThunk(
  "admin/fetchAllOrders",
  async () => {
    const res = await axios.get(`${BASE}/orders`);
    return res.data;
  },
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async () => {
    const res = await axios.get(`${BASE}/users`);
    return res.data;
  },
);

export const fetchAllProducts = createAsyncThunk(
  "admin/fetchAllProducts",
  async () => {
    const res = await axios.get(`${BASE}/products`);
    return res.data;
  },
);

export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async () => {
    const res = await axios.get(`${BASE}/admin/dashboard`);
    return res.data;
  },
);
