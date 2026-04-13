import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import appReducer from "./appSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    app: appReducer,
  },
});

// Mirror your useEffect localStorage syncing here
store.subscribe(() => {
  const { admin, app } = store.getState();
  localStorage.setItem("adminLoggedIn", JSON.stringify(admin.adminLoggedIn));
  localStorage.setItem("adminData", JSON.stringify(admin.adminData));
  localStorage.setItem("ProductType", JSON.stringify(admin.ProductType));
  localStorage.setItem("allOrders", JSON.stringify(admin.allOrders));
  localStorage.setItem("selectedOrder", JSON.stringify(admin.selectedOrder));
  localStorage.setItem("filteredOrders", JSON.stringify(admin.filteredOrders));
  localStorage.setItem("allUsers", JSON.stringify(admin.allUsers));
  localStorage.setItem("filteredUsers", JSON.stringify(admin.filteredUsers));
  localStorage.setItem("selectedUser", JSON.stringify(admin.selectedUser));
  localStorage.setItem(
    "activeProductId",
    JSON.stringify(admin.activeProductId),
  );
  localStorage.setItem("stats", JSON.stringify(admin.stats));

  localStorage.setItem("loggedIn", JSON.stringify(app.loggedIn));
  localStorage.setItem("userData", JSON.stringify(app.userData));
  localStorage.setItem("userAddress", JSON.stringify(app.userAddress));
  localStorage.setItem(
    "selectedProductId",
    JSON.stringify(app.selectedProductId),
  );
  localStorage.setItem("selectedProduct", JSON.stringify(app.selectedProduct));
  localStorage.setItem("cart", JSON.stringify(app.cart));
  localStorage.setItem("wishList", JSON.stringify(app.wishList));
  localStorage.setItem("orders", JSON.stringify(app.orders));
});

export default store;
