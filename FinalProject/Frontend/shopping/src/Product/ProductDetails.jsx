import React, { useContext, useEffect, useState } from "react";
import AppContext from "../ContextStore/AppContext";
import axios from "axios";

const ProductDetails = () => {
  let {
    selectedProduct,
    setSelectedProduct,
    selectedGender,
    setSelectedGender,
    userData,
    cart,
    setCart,
    wishList,
    setWishList,
    refresh,
    setRefresh,
  } = useContext(AppContext);
  console.log(selectedProduct);

  function handleActiveGender(value) {
    setSelectedGender(value);
  }
  const uniqueGenders = [
    ...new Set(selectedProduct?.product?.variants.map((v) => v.gender)),
  ];

  // ! add to cart not working

  let [activeImg, setActiveImg] = useState(null);
  let [activeColor, setActiveColor] = useState(null);
  let [selectedSize, setSelectedSize] = useState(null);
  let [selectedVarientId, setSelectedvarientId] = useState(null);
  if (activeImg === null) {
    setActiveImg(
      selectedProduct?.product?.variants.map((vl) =>
        vl.gender === selectedGender ? vl.images.display : "",
      ),
    );
  }
  if (activeColor === null) {
    let color = selectedProduct?.product?.variants.map((vl) =>
      vl.gender === selectedGender ? vl.color : "",
    );

    if (color) {
      setActiveColor(color[0]);
    }
  }
  if (selectedSize === null) {
    let size = selectedProduct?.product?.variants.flatMap((vl) =>
      vl.gender === selectedGender
        ? vl?.sizes.map((sz) => (sz.stock != 0 ? sz.size : ""))
        : "",
    );
    setSelectedSize(size[0]);
  }

  function handleSelectedcolor(color, id) {
    setSelectedvarientId(id);
    setActiveColor(color);
  }
  function handleActiveImg(img) {
    setActiveImg(img);
  }

  function handleSelectedSize(sz) {
    setSelectedSize(sz);
  }

  async function handleAddToCart() {
    let cartData = {
      userId: userData.id,
      productId: selectedProduct.product._id,
      variantId: selectedVarientId,
      size: selectedSize,
      quantity: 1,
    };
    console.log(cartData);

    try {
      await axios.post("http://localhost:5000/api/cart/items", cartData);
      setCart(cartData);
    } catch (err) {
      console.log("CART ERROR:", err.message);
      console.error("Failed to add to cart:", err);
    }
  }
  // console.log(selectedProduct.product.themeId._id);

  async function addToWishlist() {
    let wishlistData = {
      userId: userData.id,
      productId: selectedProduct.product._id,
      variantId: selectedVarientId,
      size: selectedSize,
      themeId: selectedProduct.product.themeId._id,
    };
    // console.error(wishlistData);
    try {
      await axios.post("http://localhost:5000/api/wishlist", wishlistData);
      alert("Added to wishlist!");
      setRefresh((prev) => prev + 1);
    } catch (err) {
      if (err.response?.data?.message === "Already in wishlist") {
        alert("Already in your wishlist!");
      } else {
        console.error(err);
      }
    }
  }
  return (
    <div>
      <div className="flex w-[80%] m-auto my-6 p-4 justify-between">
        <div className="w-[45%]">
          <div>
            <div className="w-[90%] m-auto rounded-2xl h-[30%] overflow-hidden mb-4">
              <img
                className="w-full h-full object-cover"
                src={activeImg}
                alt="images"
              />
            </div>
            {console.log(
              selectedProduct?.product?.variants.map((vl) =>
                vl.gender === selectedGender ? vl.images.display : "",
              ),
            )}
            <div className="flex h-[5%] justify-around">
              <img
                onClick={() => handleActiveImg(pose)}
                className="object-contain h-fit w-[20%] rounded-2xl"
                src={selectedProduct?.product?.variants.map((vl) =>
                  vl.gender === selectedGender && vl.color === activeColor
                    ? vl.images.display
                    : "",
                )}
                alt="images"
              />

              {selectedProduct?.product?.variants.map((vl) =>
                vl.images?.poses.map((pose) => (
                  <img
                    onClick={() => handleActiveImg(pose)}
                    className="object-contain h-fit w-[20%] rounded-2xl"
                    src={pose}
                    alt="images"
                  />
                )),
              )}
            </div>
          </div>
        </div>
        <div className="w-[45%]">
          <div className="my-4">
            <h1 className="font-bold text-5xl mb-4 text-blue-400">
              {selectedProduct?.product?.name}
            </h1>
            <p className="text-3xl">
              Rs {selectedProduct?.product?.price}
              <label className="text-green-400 font-bold "> Instock</label>
            </p>
          </div>
          <div>
            <div className="my-3">
              <h1 className="text-2xl font-bold">Selected Type</h1>
              <p className="text-blue-400 text-xl underline mb-3">
                {selectedProduct?.product?.typeId?.name}
              </p>
              <div>
                <div>
                  <p className=" font-bold text-2xl">Colors</p>
                  {selectedProduct?.product?.variants.map((vr) => (
                    <div>
                      {selectedGender === vr.gender ? (
                        <div className="flex">
                          <button
                            onClick={() =>
                              handleSelectedcolor(vr.color, vr._id)
                            }
                            className={` text-xl font-medium px-3 py-2 rounded-2xl border border-blue-200 shadow-2xs my-3
                             ${vr.color === activeColor ? "text-blue-400" : ""}
                            `}
                          >
                            {vr.color}
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
                <div className="mx-5">
                  <p className="text-xl font-semibold mb-2">size</p>
                  {selectedProduct?.product?.variants.map((vr) => (
                    <div>
                      {activeColor === vr?.color &&
                      selectedGender === vr?.gender &&
                      vr?.sizes?.every((sz) => sz.stock !== 0) ? (
                        <div className="flex justify-around">
                          {vr?.sizes?.map((sz) => (
                            <button
                              onClick={() => handleSelectedSize(sz.size)}
                              className={
                                sz.size === selectedSize ? "text-blue-400" : ""
                              }
                            >
                              {sz.size}
                            </button>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-xl  font-semibold mb-2">Gender</h1>
              <div className="flex justify-between">
                {uniqueGenders.map((gender) => (
                  <button
                    key={gender}
                    className={`${selectedGender === gender ? "text-blue-400 border-blue-400" : " border-gray-400"} px-3 py-2 border rounded-xl`}
                    onClick={() => handleActiveGender(gender)}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
            <div className="my-4">
              <h1 className="text-2xl font-bold mb-1">Product Description</h1>
              <p className="font-light">
                {selectedProduct?.product?.description}
              </p>
            </div>
            <div className="flex justify-around">
              <button
                onClick={handleAddToCart}
                className="px-3 py-2 rounded-2xl border border-blue-400 shadow-2xl  capitalize font-bold "
              >
                add to cart
              </button>
              <button onClick={addToWishlist}>wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
