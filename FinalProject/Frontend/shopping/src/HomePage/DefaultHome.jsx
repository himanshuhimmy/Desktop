import React, { useContext } from "react";
import ThemeDisplay from "./ThemeModlue/ThemeDisplay";
import AllCategory from "./ThemeModlue/AllCategory";
import FilteredProducts from "./ThemeModlue/FilteredProducts";
import AppContext from "../ContextStore/AppContext";

const DefaultHome = () => {
  const { allProducts, allThemes, allCategorys } = useContext(AppContext);

  return (
    <div>
      <ThemeDisplay />
      <AllCategory />
      <FilteredProducts />
    </div>
  );
};

export default DefaultHome;
