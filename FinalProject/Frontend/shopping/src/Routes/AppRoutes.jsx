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

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/UserRegister" element={<RegisterUserPage />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/AdminLogin" element={<AdminLoginPage />} />

        <Route path="/Home" element={<Home />}>
          <Route index element={<DefaultHome />} />
          <Route path="Membership" element={<MembErshipPage />} />
        </Route>

        {/* SUPPORT LAYOUT */}
        <Route path="/support" element={<Support />}>
          <Route path="contact" element={<ContactUs />} />
          <Route path="terms" element={<TermsConditions />} />
          <Route path="policy" element={<Policy />} />
        </Route>

        <Route path="/UserProfile" element={<UserProfilePage />}>
          <Route index element={<UserProfile />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoutes />}></Route>

      {/* Catch all wrong URLs */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
