import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  let loggedIn = useSelector((State) => State.app.loggedIn);

  let isAuth = loggedIn;
  return !isAuth ? <Outlet /> : <Navigate to={"/Home"} />;
};

export default PublicRoutes;
