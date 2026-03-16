import React from "react";
import HeadderPage from "../Headder&footer/headderPage";

import FooterPage from "../Headder&footer/FooterPage";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <HeadderPage />
      <Outlet />
      <FooterPage />
    </div>
  );
};

export default Home;
