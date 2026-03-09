import React, { useContext } from "react";
import AppContext from "../ContextStore/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  let { loggedIn } = useContext(AppContext);

  let isAuth = loggedIn;
  return isAuth ? <Outlet /> : <Navigate to="/userLogin" />;
};

export default ProtectedRoutes;
