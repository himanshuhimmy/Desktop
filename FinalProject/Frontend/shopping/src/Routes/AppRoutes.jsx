import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import RegisterUserPage from "../User/RegisterUserPage";
import UserLogin from "../User/UserLogin";
import AdminLoginPage from "../Admin/AdminLoginPage";
import Home from "../HomePage/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/UserRegister" element={<RegisterUserPage />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/AdminLogin" element={<AdminLoginPage />} />
        <Route path="/Home" element={<Home />} />
      </Route>
      <Route element={<ProtectedRoutes />}></Route>
    </Routes>
  );
};

export default AppRoutes;
