import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import HeadderPage from "../../Headder&footer/headderPage";

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="z-20">{/* <HeadderPage /> */}</div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 shrink-0 border-r border-gray-100 shadow-sm">
          <SideBar />
        </aside>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl m-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
