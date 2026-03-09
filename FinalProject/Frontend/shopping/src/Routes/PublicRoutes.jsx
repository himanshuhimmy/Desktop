import { useContext } from "react";
import AppContext from "../ContextStore/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  let { loggedIn } = useContext(AppContext);

  let isAuth = loggedIn;
  return !isAuth ? <Outlet /> : <Navigate to={"/Home"} />;
};

export default PublicRoutes;
