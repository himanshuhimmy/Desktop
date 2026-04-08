import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminContext } from "../ContextStore/AdminContext";

const ProtectedAdminRoutes = () => {
  const { adminLoggedIn } = useContext(AdminContext);

  return adminLoggedIn ? <Outlet /> : <Navigate to="/AdminLogin" />;
};

export default ProtectedAdminRoutes;
