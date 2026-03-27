import React, { useState } from "react";
import { useContext } from "react";
import AppContext from "../../ContextStore/AppContext";
import star from "../../assets/Svgs/star-blue.svg";
import EmptyThemeList from "./EmptyThemeList";
import axios from "axios";

const WishListDetails = () => {
  let { wishList, setWishList, userData, allThemes, activeTheme, setRefresh } =
    useContext(AppContext);

  let [selectedThemeModule, setSelectedThemeModule] = useState(activeTheme);
  console.log(wishList.wishlist.items.map((item) => item));

  function handleSelectedThemeModule(id) {
    if (id === "all") {
      setSelectedThemeModule("all");

      return;
    }
    setSelectedThemeModule(id);
  }

  async function handleAddToCart(product, varient, size) {
    let cartData = {
      userId: userData.id,
      productId: product,
      variantId: varient,
      size: size,
      quantity: 1,
    };

    try {
      await axios.post("http://localhost:5000/api/cart/items", cartData);
      // setCart(cartData);
      setRefresh((prev) => prev + 1);
    } catch (err) {
      console.log("CART ERROR:", err.message);
      console.error("Failed to add to cart:", err);
    }
  }

  async function HandleRemoveWishList(productId, variantId, size) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/wishlist/${productId}/${variantId}/${size}`,
        {
          params: { userId: userData.id },
        },
      );
      setRefresh((prev) => prev + 1);
    } catch (err) {
      console.error(err.response?.data?.message);
    }
  }

  const filteredItems = wishList?.wishlist.items.filter(
    (item) => item.themeId === selectedThemeModule,
  );
  return (
    <div className="p-3 ">
      <div className="my-5">
        <div className="flex p-4 items-center">
          <img className="h-10" src={star} alt="star" />
          <h1 className="text-4xl font-bold mx-3  text-blue-400">
            Curated for you
          </h1>
        </div>
        <p className="text-xl font-light">
          A curated collection of your most desired pieces. Items in your
          wishlist are reserved only for{" "}
          <label className="text-blue-400 font-bold">You</label>.
        </p>
      </div>

      <div className="flex gap-7 text-2xl mt-4">
        <button
          onClick={() => handleSelectedThemeModule("all")}
          className={`${selectedThemeModule === "all" ? " text-blue-400 underline font-bold" : ""}  `}
        >
          All Collections
        </button>
        {allThemes !== null &&
          allThemes?.themes.map((theme) => {
            return (
              <div className="flex">
                <button
                  className={
                    theme._id === selectedThemeModule &&
                    selectedThemeModule !== "all"
                      ? "text-blue-400 underline font-bold"
                      : ""
                  }
                  onClick={() => handleSelectedThemeModule(theme._id)}
                >
                  {theme.name}
                </button>
              </div>
            );
          })}
      </div>
      <hr className="  border border-blue-200 m-5" />

      <div className="my-6">
        <h1 className="text-3xl text-center font-semibold mb-2">Your List</h1>
        <hr className="  border border-blue-700  w-[8%] m-auto mb-7" />

        <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const variant = item.productId.variants.find(
                (vr) => vr._id === item.variantId,
              );

              return (
                <div
                  key={item.variantId}
                  className="rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 p-4 bg-white"
                >
                  <div className="h-56 rounded-xl overflow-hidden mb-4">
                    <img
                      className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                      src={variant?.images?.display}
                      alt="product"
                    />
                  </div>

                  <h1 className="font-semibold text-lg mb-2">
                    {item.productId.name}
                  </h1>

                  <p className="font-medium mb-3">
                    Rs/-{" "}
                    <span className="text-blue-400 font-semibold">
                      {item.productId.price}
                    </span>
                  </p>

                  <div className="flex justify-around items-center">
                    <button
                      onClick={() =>
                        handleAddToCart(
                          item.productId._id,
                          item.variantId,
                          item.size,
                        )
                      }
                      className="px-3 py-2 rounded-xl border border-blue-400 text-sm font-semibold hover:text-white hover:bg-blue-400 transition-all duration-300"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() =>
                        HandleRemoveWishList(
                          item.productId._id,
                          item.variantId,
                          item.size,
                        )
                      }
                      className="text-red-500 text-sm font-semibold hover:scale-110 transition-all duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full flex justify-center">
              <EmptyThemeList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishListDetails;
