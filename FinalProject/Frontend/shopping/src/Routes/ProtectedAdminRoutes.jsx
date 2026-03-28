import React, { useContext } from "react";
import { AdminContext } from "../ContextStore/AdminContext";

import AdminLayout from "../Admin/AdminHome/AdminLayout";

const ProtectedAdminRoutes = () => {
  let { adminLoggedIn, setAdminLoggedIn } = useContext(AdminContext);

  let loggedIn = adminLoggedIn;

  return loggedIn ? <AdminLayout /> : <Navigate to="/" />;
};

export default ProtectedAdminRoutes;
