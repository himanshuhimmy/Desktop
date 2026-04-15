import React from "react";
import HeadderPage from "../HeaderFooter/HeaderPage";
import FooterPage from "../HeaderFooter/FooterPage";
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
