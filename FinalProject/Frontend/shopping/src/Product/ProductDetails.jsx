import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGender, setRefresh } from "../Store/appSlice";
import { getMemberPrice } from "../utils/pricing";
import axios from "axios";
import { Heart, ShoppingBag, CheckCircle } from "lucide-react";
import { cn } from "../utils/cn";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.app.selectedProduct);
  const selectedGender = useSelector((state) => state.app.selectedGender);
  const userData = useSelector((state) => state.app.userData);
  const discountPercent = useSelector(
    (state) => state.app.userAddress?.user?.planId?.discountPercent ?? 0,
  );

  const [activeColor, setActiveColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    if (selectedProduct?.product?.variants) {
      const filtered = selectedProduct.product.variants.find(
        (v) => v.gender === selectedGender,
      );

      if (filtered) {
        setActiveColor(filtered.color);
        setActiveImg(filtered.images.display);

        const firstInStock = filtered.sizes.find((s) => s.stock > 0);
        setSelectedSize(firstInStock ? firstInStock.size : "");
      }
    }
  }, [selectedProduct, selectedGender]);

  const uniqueGenders = [
    ...new Set(selectedProduct?.product?.variants.map((v) => v.gender)),
  ];

  const currentVariant = selectedProduct?.product?.variants.find(
    (v) => v.gender === selectedGender && v.color === activeColor,
  );

  const handleAddToCart = async () => {
    const cartData = {
      userId: userData?.id,
      productId: selectedProduct.product._id,
      variantId: currentVariant?._id,
      size: selectedSize,
      quantity: 1,
    };

    try {
      await axios.post("http://localhost:5000/api/cart/items", cartData);

      dispatch(setRefresh());
    } catch (err) {
      console.error("Cart Error:", err.message);
    }
  };
  const handleWishList = async () => {
    let wishListData = {
      userId: userData?.id,
      productId: selectedProduct.product._id,
      variantId: currentVariant?._id,
      themeId: selectedProduct.product.themeId._id,
      size: selectedSize,
    };

    console.log(wishListData);
    try {
      await axios.post("http://localhost:5000/api/wishlist", wishListData);
      dispatch(setRefresh());
    } catch (error) {
      console.error("Wish Error:", err.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        {/* Left: Image Gallery */}
        <div className="md:w-1/2 p-8 bg-gray-50/50">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-inner bg-white">
            <img
              src={activeImg}
              className="w-full h-full object-cover transition-opacity duration-300"
              alt="Main Product"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveImg(currentVariant?.images?.display)}
              className={cn(
                "w-20 h-24 rounded-lg overflow-hidden border-2 transition-all",
                activeImg === currentVariant?.images?.display
                  ? "border-blue-500 scale-105"
                  : "border-transparent",
              )}
            >
              <img
                src={currentVariant?.images?.display}
                className="w-full h-full object-cover"
              />
            </button>
            {currentVariant?.images?.poses.map((pose, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(pose)}
                className={cn(
                  "w-20 h-24 rounded-lg overflow-hidden border-2 transition-all",
                  activeImg === pose ? "border-blue-500 scale-105" : "border-transparent",
                )}
              >
                <img src={pose} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">
              {selectedProduct?.product?.typeId?.name}
            </span>
            <h1 className="text-4xl font-black text-gray-900 mt-2 mb-4">
              {selectedProduct?.product?.name}
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              {discountPercent > 0 ? (
                <>
                  <p className="text-2xl line-through text-gray-400 font-light">
                    ₹{selectedProduct?.product?.price}
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    ₹
                    {getMemberPrice(
                      selectedProduct?.product?.price,
                      discountPercent,
                    )}
                  </p>
                  <span className="bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {discountPercent}% OFF
                  </span>
                </>
              ) : (
                <p className="text-3xl font-light text-gray-700">
                  ₹{selectedProduct?.product?.price}
                </p>
              )}
              <span className="flex items-center gap-1 text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle size={14} /> In Stock
              </span>
            </div>
          </div>

          <div className="space-y-8">
            {/* Gender Selection */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-tighter mb-3">
                Target
              </h3>
              <div className="flex gap-3">
                {uniqueGenders.map((g) => (
                  <button
                    key={g}
                    onClick={() => dispatch(setSelectedGender(g))}
                    className={cn(
                      "px-6 py-2 rounded-xl font-bold border-2 transition-all",
                      selectedGender === g
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-100 text-gray-400",
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">
                Available Colors
              </h3>
              <div className="flex flex-wrap gap-3">
                {selectedProduct?.product?.variants
                  .filter((v) => v.gender === selectedGender)
                  .map((vr) => (
                    <button
                      key={vr._id}
                      onClick={() => {
                        setActiveColor(vr.color);
                        setActiveImg(vr.images.display);
                      }}
                      className={cn(
                        "px-4 py-2 rounded-xl border-2 font-medium transition-all",
                        activeColor === vr.color
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-100 text-gray-400",
                      )}
                    >
                      {vr.color}
                    </button>
                  ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">
                Select Size
              </h3>
              <div className="flex gap-3">
                {currentVariant?.sizes.map((sz) => (
                  <button
                    key={sz.size}
                    disabled={sz.stock === 0}
                    onClick={() => setSelectedSize(sz.size)}
                    className={cn(
                      "w-12 h-12 rounded-xl border-2 font-bold transition-all flex items-center justify-center",
                      sz.stock === 0 && "bg-gray-50 text-gray-200 border-gray-50 cursor-not-allowed",
                      sz.stock > 0 && selectedSize === sz.size && "border-gray-900 bg-gray-900 text-white",
                      sz.stock > 0 && selectedSize !== sz.size && "border-gray-200 text-gray-600 hover:border-gray-900",
                    )}
                  >
                    {sz.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button
                onClick={handleWishList}
                className="px-6 py-4 rounded-2xl border-2 border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100 transition-colors"
              >
                <Heart size={24} />
              </button>
            </div>

            <div className="border-t pt-8">
              <h3 className="font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-500 leading-relaxed font-light">
                {selectedProduct?.product?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
