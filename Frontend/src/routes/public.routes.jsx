import { Route } from "react-router-dom";
import { AuthLayout } from "../components/layout/AuthLayout";
import Login from "../pages/auth/Login";

// All routes accessible without authentication
const PublicRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
  </Route>
);

export default PublicRoutes;
