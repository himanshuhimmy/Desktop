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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public only routes */}
      <Route element={<PublicRoutes />}>
        <Route index element={<UserLogin />} />
        <Route path="/UserRegister" element={<RegisterUserPage />} />
        <Route path="/AdminLogin" element={<AdminLoginPage />} />

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
