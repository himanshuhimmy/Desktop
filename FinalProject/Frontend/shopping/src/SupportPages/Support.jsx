import React from "react";
import HeadderPage from "../HeaderFooter/HeaderPage";
import SupportFooter from "./SupportFooter";

import Policy from "./Policy";
import { Outlet } from "react-router-dom";

const Support = () => {
  return (
    <div>
      <HeadderPage />
      <Outlet />
      <SupportFooter />
    </div>
  );
};

export default Support;
