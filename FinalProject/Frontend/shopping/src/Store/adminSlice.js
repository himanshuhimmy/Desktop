import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProductTypes,
  fetchAllOrders,
  fetchAllUsers,
  fetchAllProducts,
  fetchDashboardStats,
} from "./adminThunks";

// Helper to safely parse localStorage
const fromStorage = (key, fallback = null) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const initialState = {
  adminLoggedIn: fromStorage("adminLoggedIn", false),
  adminData: fromStorage("adminData", null),
  activeProductId: fromStorage("activeProductId", null),
  ProductType: fromStorage("ProductType", null),
  filteredProducts: fromStorage("filteredProducts", null),
  filteredOrders: fromStorage("filteredOrders", null),
  filteredUsers: fromStorage("filteredUsers", null),
  allOrders: fromStorage("allOrders", null),
  allUsers: fromStorage("allUsers", null),
  selectedOrder: fromStorage("selectedOrder", null),
  selectedUser: fromStorage("selectedUser", null),
  allProducts: null,
  stats: fromStorage("stats", null),
  refresh: 0,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminLoggedIn: (state, action) => {
      state.adminLoggedIn = action.payload;
    },
    setAdminData: (state, action) => {
      state.adminData = action.payload;
    },
    setActiveProductId: (state, action) => {
      state.activeProductId = action.payload;
    },
    setProductType: (state, action) => {
      state.ProductType = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setFilteredOrders: (state, action) => {
      state.filteredOrders = action.payload;
    },
    setFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload;
    },
    setAllorders: (state, action) => {
      state.allOrders = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setRefresh: (state) => {
      state.refresh += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductTypes.fulfilled, (state, action) => {
        state.ProductType = action.payload;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export const {
  setAdminLoggedIn,
  setAdminData,
  setActiveProductId,
  setProductType,
  setFilteredProducts,
  setFilteredOrders,
  setFilteredUsers,
  setAllorders,
  setAllUsers,
  setSelectedOrder,
  setSelectedUser,
  setAllProducts,
  setStats,
  setRefresh,
} = adminSlice.actions;

export default adminSlice.reducer;
