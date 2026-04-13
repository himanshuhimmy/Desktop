import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProducts } from "../../Store/adminSlice";

const FilterProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.admin.allProducts);
  const refresh = useSelector((state) => state.admin.refresh);
  const allCategorys = useSelector((state) => state.app.allCategorys);
  const allThemes = useSelector((state) => state.app.allThemes);

  const [filterState, setFilterState] = useState({
    theme: "All",
    category: "All",
    search: "",
    price: "Low to High",
    status: "All", // Added Status filter
  });

  useEffect(() => {
    if (!allProducts?.products) return;

    let data = [...allProducts.products];

    // 1. Search Filter
    if (filterState.search) {
      const searchLower = filterState.search.toLowerCase();
      data = data.filter((p) => p.name.toLowerCase().includes(searchLower));
    }

    // 2. Category Filter
    if (filterState.category !== "All") {
      data = data.filter((p) => p.catId?.name === filterState.category);
    }

    // 3. Theme Filter
    if (filterState.theme !== "All") {
      data = data.filter((p) => p.themeId?.name === filterState.theme);
    }

    // 4. Status Filter
    if (filterState.status !== "All") {
      const targetStatus = filterState.status === "Active";
      data = data.filter((p) => p.isActive === targetStatus);
    }

    // 5. Sorting
    data.sort((a, b) => {
      return filterState.price === "Low to High"
        ? a.price - b.price
        : b.price - a.price;
    });
    console.log("filterd the data");
    dispatch(setFilteredProducts(data));
  }, [filterState, allProducts, refresh]);

  const handleOnchange = (field, value) => {
    setFilterState((prev) => ({ ...prev, [field]: value }));
  };

  const selectClass =
    "p-2 bg-blue-500 text-white rounded-xl w-full cursor-pointer outline-none transition-all hover:bg-blue-600";
  const labelClass = "text-blue-800 mb-1 font-semibold text-sm";

  return (
    <div className="w-[95%] m-auto my-7 bg-blue-100 p-6 rounded-3xl shadow-sm border border-blue-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <p className={labelClass}>Search</p>
          <input
            onChange={(e) => handleOnchange("search", e.target.value)}
            className="bg-white p-2 rounded-xl w-full border border-blue-200 outline-blue-500"
            placeholder="Product name..."
            type="text"
          />
        </div>
        <div>
          <p className={labelClass}>Category</p>
          <select
            onChange={(e) => handleOnchange("category", e.target.value)}
            className={selectClass}
          >
            <option value="All">All Categories</option>
            {allCategorys?.categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className={labelClass}>Theme</p>
          <select
            onChange={(e) => handleOnchange("theme", e.target.value)}
            className={selectClass}
          >
            <option value="All">All Themes</option>
            {allThemes?.themes.map((t) => (
              <option key={t._id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className={labelClass}>Visibility</p>
          <select
            onChange={(e) => handleOnchange("status", e.target.value)}
            className={selectClass}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <p className={labelClass}>Price Sort</p>
          <select
            onChange={(e) => handleOnchange("price", e.target.value)}
            className={selectClass}
          >
            <option value="Low to High">Lowest First</option>
            <option value="High to Low">Highest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
