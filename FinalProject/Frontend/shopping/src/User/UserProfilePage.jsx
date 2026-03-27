import React from "react";
import SupportFooter from "../SupportPges/SupportFooter";
import HeadderPage from "../Headder&footer/headderPage";
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
