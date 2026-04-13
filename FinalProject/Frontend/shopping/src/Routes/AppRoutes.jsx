import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import RegisterUserPage from "../User/RegisterUserPage";
import UserLogin from "../User/UserLogin";
import AdminLoginPage from "../Admin/AdminLoginPage";
import Home from "../HomePage/Home";
import ContactUs from "../SupportPges/ContactUs";
import TermsConditions from "../SupportPges/Terms&Conditions";

import Support from "../SupportPges/Support";
import Policy from "../SupportPges/Policy";
import NotFound from "../ErrorPages/NotFound";
import DefaultHome from "../HomePage/DefaultHome";
import MembErshipPage from "../MembershipModule/MembErshipPage";
import UserProfile from "../User/UserProfile";
import UserProfilePage from "../User/UserProfilePage";

import CartPage from "../User/CartSection/CartPage";
import WishListPage from "../User/WishlistSection/WishListPage";
import ProductDetails from "../Product/ProductDetails";
import ProductPage from "../Product/ProductPage";
import AdminLayout from "../Admin/AdminHome/AdminLayout";
import ProtectedAdminRoutes from "../Routes/ProtectedAdminRoutes";
import DashboardPage from "../Admin/Dashboard/DashboardPage";
import UsersPage from "../Admin/Users/UsersPage";
import OrderPage from "../Admin/Orders/OrderPage";
import ProductsPage from "../Admin/Products/ProductsPage";
import AdminPage from "../Admin/AdminPage/AdminPage";
import SelectedProduct from "../Admin/Products/SelectedProduct";
import SelectedOrder from "../Admin/Orders/SelectedOrder";

import AdminSelectedUser from "../Admin/Users/AdminSelectedUser";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/AdminLogin" element={<AdminLoginPage />} />
      <Route
        path="/Admin"
        element={<ProtectedAdminRoutes />}
      >
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="Products" element={<ProductsPage />} />
          <Route
            path="Products/selectedProduct"
            element={<SelectedProduct />}
          />
          <Route path="Orders/selectedOrder" element={<SelectedOrder />} />
          <Route path="Users/selectedUser" element={<AdminSelectedUser />} />
          <Route path="AdminPage" element={<AdminPage />} />
        </Route>
      </Route>

      {/* Public only routes */}
      <Route element={<PublicRoutes />}>
        <Route index element={<UserLogin />} />
        <Route path="/UserRegister" element={<RegisterUserPage />} />

        <Route path="/support" element={<Support />}>
          <Route path="contact" element={<ContactUs />} />
          <Route path="terms" element={<TermsConditions />} />
          <Route path="policy" element={<Policy />} />
        </Route>
      </Route>

      {/* ✅ Home is outside PublicRoutes */}
      <Route path="/Home" element={<Home />}>
        <Route index element={<DefaultHome />} />
        <Route path="Membership" element={<MembErshipPage />} />
        <Route path="ProductPage" element={<ProductPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/UserProfile" element={<UserProfilePage />}>
          <Route index element={<UserProfile />} />
          <Route path="Wishlist" element={<WishListPage />} />
          <Route path="UserCart" element={<CartPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
