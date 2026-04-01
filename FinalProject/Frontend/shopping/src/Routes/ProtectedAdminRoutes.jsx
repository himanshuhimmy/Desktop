import React, { useContext } from "react";
import { AdminContext } from "../ContextStore/AdminContext";

import AdminLayout from "../Admin/AdminHome/AdminLayout";

const ProtectedAdminRoutes = () => {
  let { adminLoggedIn, setAdminLoggedIn } = useContext(AdminContext);

  return adminLoggedIn ? <AdminLayout /> : <Navigate to="/AdminLogin" />;
};

export default ProtectedAdminRoutes;
