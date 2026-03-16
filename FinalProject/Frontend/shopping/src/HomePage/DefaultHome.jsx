import React from "react";
import ThemeDisplay from "./ThemeModlue/ThemeDisplay";
import FilteredThemeProducts from "./ThemeModlue/FilteredThemeProducts";

const DefaultHome = () => {
  return (
    <div>
      <ThemeDisplay />
      <FilteredThemeProducts />
    </div>
  );
};

export default DefaultHome;
