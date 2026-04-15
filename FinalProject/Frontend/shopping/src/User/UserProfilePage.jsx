import React from "react";
import SupportFooter from "../SupportPages/SupportFooter";
import HeadderPage from "../HeaderFooter/HeaderPage";
import UserProfile from "./UserProfile";
import { Outlet } from "react-router-dom";

const UserProfilePage = () => {
  return (
    <div>
      <HeadderPage />
      <Outlet />
      <SupportFooter />
    </div>
  );
};

export default UserProfilePage;
