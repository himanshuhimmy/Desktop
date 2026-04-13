import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  let loggedIn = useSelector((State) => State.app.loggedIn);

  let isAuth = loggedIn;
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
