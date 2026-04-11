import React, { useState, useMemo, useContext } from "react"; // Added useMemo
import AppContext from "../../ContextStore/AppContext";
import star from "../../assets/Svgs/star-blue.svg";
import EmptyThemeList from "./EmptyThemeList";
import axios from "axios";

const WishListDetails = () => {
  const { wishList, userData, allThemes, activeTheme, setRefresh } =
    useContext(AppContext);

  const [selectedThemeModule, setSelectedThemeModule] = useState(
    activeTheme || "all",
  );

  const filteredItems = useMemo(() => {
    const items = wishList?.wishlist?.items || [];

    if (selectedThemeModule === "all") {
      return items;
    }

    return items.filter((item) => item.themeId === selectedThemeModule);
  }, [wishList, selectedThemeModule]);
  const handleSelectedThemeModule = (id) => {
    setSelectedThemeModule(id);
  };

  const handleAddToCart = async (product, variant, size) => {
    const cartData = {
      userId: userData.id,
      productId: product,
      variantId: variant,
      size: size,
      quantity: 1,
    };

    try {
      await axios.post("http://localhost:5000/api/cart/items", cartData);
      setRefresh((prev) => prev + 1);
    } catch (err) {
      console.error("CART ERROR:", err.message);
    }
  };

  const HandleRemoveWishList = async (productId, variantId, size) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/wishlist/${productId}/${variantId}/${size}`,
        { params: { userId: userData.id } },
      );

      setRefresh((prev) => prev + 1);
    } catch (err) {
      console.error("REMOVE ERROR:", err.response?.data?.message);
    }
  };

  console.log(wishList.wishlist.items);
  console.log(selectedThemeModule);
  return (
    <div className="p-3 max-w-7xl mx-auto">
      <div className="my-5">
        <div className="flex p-4 items-center">
          <img className="h-10" src={star} alt="star" />
          <h1 className="text-4xl font-black mx-3 text-blue-400 italic tracking-tighter">
            CURATED FOR YOU
          </h1>
        </div>
        <p className="text-xl font-light text-gray-500 px-4">
          Items in your wishlist are reserved only for{" "}
          <span className="text-blue-400 font-bold">YOU</span>.
        </p>
      </div>

      {/* Theme Selection Tabs */}
      <div className="flex gap-7 text-lg mt-8 px-4 border-b border-gray-100 pb-2">
        <button
          onClick={() => handleSelectedThemeModule("all")}
          className={`pb-2 transition-all ${
            selectedThemeModule === "all"
              ? "text-blue-500 border-b-2 border-blue-500 font-bold"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          All Collections
        </button>
        {allThemes?.themes?.map((theme) => (
          <button
            key={theme._id}
            className={`pb-2 transition-all ${
              theme._id === selectedThemeModule
                ? "text-blue-500 border-b-2 border-blue-500 font-bold"
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => handleSelectedThemeModule(theme._id)}
          >
            {theme.name}
          </button>
        ))}
      </div>

      <div className="my-10">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const variant = item.productId?.variants?.find(
                (vr) => vr._id === item.variantId,
              );

              return (
                <div
                  key={`${item.variantId}-${item.size}`} // FIX 3: Unique key per variant/size combo
                  className="group rounded-4xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 p-5 bg-white"
                >
                  <div className="h-64 rounded-3xl overflow-hidden mb-6 bg-gray-50">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      src={variant?.images?.display}
                      alt={item.productId?.name}
                    />
                  </div>

                  <div className="px-2">
                    <h2 className="font-bold text-xl text-gray-800 mb-1">
                      {item.productId?.name}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 uppercase tracking-widest font-medium">
                      Size: {item.size}
                    </p>

                    <div className="flex justify-between items-center mt-6">
                      <p className="font-black text-2xl text-blue-500">
                        ₹{item.productId?.price}
                      </p>

                      <div className="flex gap-4">
                        <button
                          onClick={() =>
                            HandleRemoveWishList(
                              item.productId._id,
                              item.variantId,
                              item.size,
                            )
                          }
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Remove from Wishlist"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() =>
                            handleAddToCart(
                              item.productId._id,
                              item.variantId,
                              item.size,
                            )
                          }
                          className="bg-gray-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-gray-200 hover:shadow-blue-100"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20">
              <EmptyThemeList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishListDetails;
