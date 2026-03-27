import React from "react";
import { useContext } from "react";
import AppContext from "../../ContextStore/AppContext";

const AllCategory = () => {
  let {
    allCategorys,
    setSelectedGender,
    selectedGender,
    activeCategory,
    setActiveCategory,
  } = useContext(AppContext);

  function handleGender(gender) {
    setSelectedGender(gender);
  }

  function handleCat(cat) {
    setActiveCategory(cat);
  }
  return (
    <div>
      <div className="flex justify-around my-6">
        <div className="flex gap-5 items-center">
          <h1 className="text-2xl font-bold text-blue-700">Collection</h1>

          <div className="flex  gap-4">
            {allCategorys !== null &&
              allCategorys.categories.map((cat) => {
                return (
                  <button
                    onClick={() => handleCat(cat.name)}
                    className={`"font-medium" ${activeCategory === cat.name ? "text-blue-500" : ""}`}
                    key={cat._id}
                  >
                    {cat.name}
                  </button>
                );
              })}
          </div>
        </div>
        <div className="flex  gap-4 items-center">
          <button
            className={`${selectedGender === "male" ? " text-blue-500 font-normal" : ""}  `}
            onClick={() => handleGender("male")}
          >
            Male
          </button>
          <button
            className={`${selectedGender === "female" ? " text-blue-500 font-normal" : ""}  `}
            onClick={() => handleGender("female")}
          >
            Female
          </button>
          <button
            className={`${selectedGender === "kids" ? " text-blue-500 font-normal" : ""}  `}
            onClick={() => handleGender("kids")}
          >
            Kids
          </button>
          <button
            className={`${selectedGender === "unisex" ? " text-blue-500 font-normal" : ""}  `}
            onClick={() => handleGender("unisex")}
          >
            Unisex
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
