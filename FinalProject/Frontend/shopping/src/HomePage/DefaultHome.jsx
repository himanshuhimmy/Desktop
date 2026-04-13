import React from "react";
import ThemeDisplay from "./ThemeModlue/ThemeDisplay";
import AllCategory from "./ThemeModlue/AllCategory";
import FilteredProducts from "./ThemeModlue/FilteredProducts";

const DefaultHome = () => {
  return (
    <div>
      <ThemeDisplay />
      <AllCategory />
      <FilteredProducts />
    </div>
  );
};

export default DefaultHome;
