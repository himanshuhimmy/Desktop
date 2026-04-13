import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMembershipInfo,
  fetchAllThemes,
  fetchAllCategories,
  fetchAllProducts,
  fetchSelectedProduct,
  fetchUserWishlist,
  fetchUserCart,
  fetchUserOrders,
  fetchUserAddress,
} from "./appThunks";

const fromStorage = (key, fallback = null) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const initialState = {
  inputText: null,
  userAddress: fromStorage("userAddress", null),
  userData: fromStorage("userData", null),
  membershipInfo: null,
  loggedIn: fromStorage("loggedIn", false),
  refresh: 0,
  selectedProduct: fromStorage("selectedProduct", null),
  selectedProductId: fromStorage("selectedProductId", null),
  allThemes: null,
  activeTheme: "69c0314c912b0ce5a0292afc",
  allCategorys: null,
  activeCategory: "Tops",
  allProducts: null,
  userWishList: null,
  selectedGender: "male",
  cart: fromStorage("cart", null),
  wishList: fromStorage("wishList", null),
  orders: fromStorage("orders", null),
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInputText: (state, action) => {
      state.inputText = action.payload;
    },
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setMembershipInfo: (state, action) => {
      state.membershipInfo = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setRefresh: (state) => {
      state.refresh += 1;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload;
    },
    setAllThemes: (state, action) => {
      state.allThemes = action.payload;
    },
    setActiveTheme: (state, action) => {
      state.activeTheme = action.payload;
    },
    setAllCategorys: (state, action) => {
      state.allCategorys = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setUserWishList: (state, action) => {
      state.userWishList = action.payload;
    },
    setSelectedGender: (state, action) => {
      state.selectedGender = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembershipInfo.fulfilled, (state, action) => {
        state.membershipInfo = action.payload;
      })
      .addCase(fetchAllThemes.fulfilled, (state, action) => {
        state.allThemes = action.payload;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.allCategorys = action.payload;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(fetchSelectedProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(fetchUserWishlist.fulfilled, (state, action) => {
        state.wishList = action.payload;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.userAddress = action.payload;
      });
  },
});

export const {
  setInputText,
  setUserAddress,
  setUserData,
  setMembershipInfo,
  setLoggedIn,
  setRefresh,
  setSelectedProduct,
  setSelectedProductId,
  setAllThemes,
  setActiveTheme,
  setAllCategorys,
  setActiveCategory,
  setAllProducts,
  setUserWishList,
  setSelectedGender,
  setCart,
  setWishList,
  setOrders,
} = appSlice.actions;

export default appSlice.reducer;
