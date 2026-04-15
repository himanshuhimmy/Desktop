import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
// admin thunks (keep)
import {
  fetchAllOrders,
  fetchAllProducts as fetchAdminProducts,
  fetchAllUsers,
  fetchDashboardStats,
  fetchProductTypes,
} from "./Store/adminThunks";
// NEW app thunks
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
} from "./Store/appThunks";

function App() {
  const dispatch = useDispatch();
  const adminRefresh = useSelector((state) => state.admin.refresh);
  const userData = useSelector((state) => state.app.userData);
  const selectedProductId = useSelector((state) => state.app.selectedProductId);
  let userRefresh = useSelector((state) => state.app.refresh);

  // Initial fetches (public data)
  useEffect(() => {
    dispatch(fetchProductTypes());
    dispatch(fetchAllOrders());
    dispatch(fetchAllUsers());
    dispatch(fetchAdminProducts());
    dispatch(fetchDashboardStats());
    dispatch(fetchMembershipInfo());
    dispatch(fetchAllThemes());
    dispatch(fetchAllCategories());
    dispatch(fetchAllProducts());
  }, []);

  // Re-fetch admin products on admin refresh
  useEffect(() => {
    if (adminRefresh > 0) dispatch(fetchAdminProducts());
  }, [adminRefresh]);

  // Re-fetch user-specific data when user logs in
  useEffect(() => {
    if (!userData?.id) return;
    dispatch(fetchUserWishlist(userData.id)); // import from appThunks
    dispatch(fetchUserCart(userData.id)); // import from appThunks
    dispatch(fetchUserOrders(userData.id)); // import from appThunks
    dispatch(fetchUserAddress(userData.id)); // import from appThunks
    dispatch(fetchAllOrders());
  }, [userData?.id, userRefresh]);

  // Re-fetch selected product when ID changes
  useEffect(() => {
    if (!selectedProductId) return;
    dispatch(fetchSelectedProduct(selectedProductId)); // import from appThunks
  }, [selectedProductId]);

  return <AppRoutes />;
}

export default App;
