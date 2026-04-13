import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoutes = () => {
  const adminLoggedIn = useSelector((state) => state.admin.adminLoggedIn);

  return adminLoggedIn ? <Outlet /> : <Navigate to="/AdminLogin" />;
};

export default ProtectedAdminRoutes;
