import React from "react";
import HeadderPage from "../Headder&footer/headderPage";
import ThemeDisplay from "./ThemeModlue/ThemeDisplay";
import FilteredThemeProducts from "./ThemeModlue/FilteredThemeProducts";

const Home = () => {
  return (
    <div>
      <HeadderPage />
      <ThemeDisplay />
      <FilteredThemeProducts />
    </div>
  );
};

export default Home;
