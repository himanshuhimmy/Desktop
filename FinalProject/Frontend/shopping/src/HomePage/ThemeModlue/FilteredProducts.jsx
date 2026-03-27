import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../ContextStore/AppContext";
import { Heart } from "lucide-react";
import CategoryNotFound from "./CategoryNotFound";
import { NavLink } from "react-router-dom";

const FilteredProducts = () => {
  let {
    allProducts,
    activeTheme,
    selectedGender,
    activeCategory,
    allThemes,
    selectedProductId,
    setSelectedProductId,
  } = useContext(AppContext);
  let [themeProduct, setThemeProduct] = useState(null);
  let [currentTheme, setCurrentTheme] = useState(null);

  useEffect(() => {
    if (!allProducts) return;

    let data = allProducts.products.filter((product) => {
      const themeMatch = product.themeId._id === activeTheme;
      const categoryMatch = product.catId.name === activeCategory;

      const genderMatch = product.variants.some(
        (v) => v.gender === selectedGender,
      );

      return themeMatch && categoryMatch && genderMatch;
    });

    if (!allThemes) return;
    let themeData = allThemes.themes.filter((th) => th._id === activeTheme);
    setCurrentTheme(themeData.map((th) => th.name));
    setThemeProduct(data);
  }, [activeTheme, allProducts, activeCategory, selectedGender]);

  // console.log(themeProduct);

  const getDisplayImage = (product) => {
    const variant = product.variants.find((g) => g.gender === selectedGender);
    return variant?.images?.display || product.variants[0]?.images?.display;
  };

  function handleSelectedProduct(id) {
    setSelectedProductId(id);
  }

  return (
    <>
      <div className="w-[80%] m-auto mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 my-6">
        {themeProduct !== null &&
          themeProduct.map((product) => (
            <NavLink
              onClick={() => handleSelectedProduct(product._id)}
              to={"ProductPage"}
              key={product._id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
            >
              {/* Image Section */}
              <div className="relative bg-gray-100 h-60">
                <img
                  src={getDisplayImage(product)}
                  alt="product"
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                />
                {/* <span className="absolute top-3 left-3 bg-white text-xs font-bold tracking-widest px-2 py-1 rounded-md text-gray-700">
                  EXCLUSIVE
                </span> */}
                <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow">
                  <Heart size={16} className="text-gray-400" />
                </button>
              </div>

              {/* Info Section */}
              <div className="p-3">
                <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-1">
                  {currentTheme === "regular"
                    ? "Luxe"
                    : ` ${currentTheme} x Luxe`}
                </p>
                <p className="text-sm font-bold text-gray-800 leading-tight mb-2">
                  {product.name || "Product"}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price}
                  </span>
                </div>

                {/* Rating */}
                {/* <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-xs text-gray-500">4.8</span>
                  </div> */}
              </div>
            </NavLink>
          ))}
      </div>

      {themeProduct && themeProduct.length === 0 && (
        <CategoryNotFound theme={currentTheme} />
      )}
    </>
  );
};

export default FilteredProducts;
