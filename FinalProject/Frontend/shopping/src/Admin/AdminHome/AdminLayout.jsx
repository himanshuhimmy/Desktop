import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import HeadderPage from "../../Headder&footer/headderPage";

const AdminLayout = () => {
  return (
    <>
      <HeadderPage />
      <div className="flex">
        <div className="w-[35%]">
          <SideBar />
        </div>
        <div className="w-[65%]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
