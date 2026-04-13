import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGender, setActiveCategory } from "../../Store/appSlice";

const AllCategory = () => {
  const dispatch = useDispatch();
  const allCategorys = useSelector((state) => state.app.allCategorys);
  const selectedGender = useSelector((state) => state.app.selectedGender);
  const activeCategory = useSelector((state) => state.app.activeCategory);

  function handleGender(gender) {
    dispatch(setSelectedGender(gender));
  }

  function handleCat(cat) {
    dispatch(setActiveCategory(cat));
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
