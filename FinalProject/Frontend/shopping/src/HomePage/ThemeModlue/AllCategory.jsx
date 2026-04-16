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
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4 my-6 px-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 items-center">
          <h1 className="text-2xl font-bold text-blue-700">Collection</h1>
          <div className="flex flex-wrap gap-3">
            {allCategorys !== null &&
              allCategorys.categories.map((cat) => (
                <button
                  onClick={() => handleCat(cat.name)}
                  className={`font-medium px-2 py-1 rounded transition-colors ${activeCategory === cat.name ? "text-blue-500" : "text-gray-600 hover:text-blue-400"}`}
                  key={cat._id}
                >
                  {cat.name}
                </button>
              ))}
          </div>
        </div>

        {/* Gender */}
        <div className="flex flex-wrap gap-3 items-center">
          {["male", "female", "kids", "unisex"].map((g) => (
            <button
              key={g}
              className={`capitalize px-2 py-1 rounded transition-colors ${selectedGender === g ? "text-blue-500 font-semibold" : "text-gray-500 hover:text-blue-400"}`}
              onClick={() => handleGender(g)}
            >
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
