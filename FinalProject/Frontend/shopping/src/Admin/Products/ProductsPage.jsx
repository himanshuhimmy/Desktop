import React from "react";
import ProductLists from "./ProductLists";
import FilterProducts from "./FilterProducts";

const ProductsPage = () => {
  return (
    <div>
      <FilterProducts />
      <ProductLists />
    </div>
  );
};

export default ProductsPage;
