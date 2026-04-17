import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const fetchProductTypes = createAsyncThunk(
  "admin/fetchProductTypes",
  async () => {
    const res = await api.get("/producttypes");
    return res.data;
  },
);

export const fetchAllOrders = createAsyncThunk(
  "admin/fetchAllOrders",
  async () => {
    const res = await api.get("/orders");
    return res.data;
  },
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async () => {
    const res = await api.get("/users");
    return res.data;
  },
);

export const fetchAllProducts = createAsyncThunk(
  "admin/fetchAllProducts",
  async () => {
    const res = await api.get("/products");
    return res.data;
  },
);

export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async () => {
    const res = await api.get("/admin/dashboard");
    return res.data;
  },
);
