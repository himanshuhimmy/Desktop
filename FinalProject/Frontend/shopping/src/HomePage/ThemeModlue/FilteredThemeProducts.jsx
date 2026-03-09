import React from "react";

const FilteredThemeProducts = () => {
  return (
    <div className="flex justify-around my-6">
      <div className="flex gap-5 items-center">
        <h1 className="text-2xl font-bold text-blue-700">Collection</h1>
        <div className="flex  gap-4">
          <p>T-shirts</p>
          <p> Pants</p>
          <p> Shoes</p>
        </div>
      </div>
      <div className="flex  gap-4 items-center">
        <p>Male</p>
        <p> Female</p>
        <p> Kids</p>
      </div>
    </div>
  );
};

export default FilteredThemeProducts;
