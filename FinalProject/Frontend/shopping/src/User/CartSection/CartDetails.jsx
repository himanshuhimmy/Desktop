import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../../Store/appSlice";
import { getMemberPrice } from "../../utils/pricing";
import axios from "axios";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import OrderPage from "../OrderSection/OrderPage";
import CheckoutModal from "./CheckoutModal";

import free from "../../assets/Svgs/memberships/free.svg";
import fan from "../../assets/Svgs/memberships/fan.svg";
import hero from "../../assets/Svgs/memberships/hero.svg";
import legend from "../../assets/Svgs/memberships/legend.svg";

const allMemebers = { Free: free, Fan: fan, Hero: hero, Legend: legend };

const CartDetails = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.app.cart);
  const userAddress = useSelector((state) => state.app.userAddress);
  const discountPercent = useSelector(
    (state) => state.app.userAddress?.user?.planId?.discountPercent ?? 0,
  );

  const [selectedItem, setSelectedItem] = useState(null);

  const updateQuantity = async (variantId, size, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    try {
      await axios.patch(
        `http://localhost:5000/api/cart/items/${variantId}/${size}`,
        { quantity: newQuantity },
        { params: { userId: userAddress.user._id } },
      );
      dispatch(setRefresh());
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  const removeItem = async (variantId, size) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/items/${variantId}/${size}`,
        { params: { userId: userAddress.user._id } },
      );
      dispatch(setRefresh());
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };


  return (
    <>
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-[60%]">
          <header className="mb-10">
            <h1 className="text-5xl font-black italic tracking-tighter text-gray-900 mb-4">
              SHOPPING BAG
            </h1>
            <div className="flex items-center gap-4">
              <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-bold">
                {cart?.cart?.items?.length || 0} ITEMS
              </span>
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-2xl">
                <img
                  className="h-6"
                  src={allMemebers[userAddress?.user?.planId?.name]}
                  alt="tier"
                />
                <span className="text-sm font-black text-blue-600 uppercase tracking-widest">
                  {userAddress?.user?.planId?.name} Benefits Applied
                </span>
              </div>
            </div>
          </header>

          <div className="space-y-6">
            {cart?.cart?.items.map((product) => {
              const variant = product.productId.variants.find(
                (vr) => vr._id === product.variantId,
              );

              return (
                <div
                  key={`${product.variantId}-${product.size}`}
                  className="group bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-center"
                >
                  {/* Image */}
                  <div className="w-32 h-40 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={variant?.images?.display}
                      alt="product"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow space-y-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-gray-900">
                      {product.productId.name}
                    </h3>
                    <p className="text-sm text-gray-400 font-medium">
                      SIZE: {product.size}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap justify-center sm:justify-start">
                      {discountPercent > 0 ? (
                        <>
                          <span className="text-sm line-through text-gray-400">
                            ₹{product.productId.price}
                          </span>
                          <span className="text-lg font-black text-blue-500">
                            ₹
                            {getMemberPrice(
                              product.productId.price,
                              discountPercent,
                            )}
                          </span>
                          <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            {discountPercent}% OFF
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-black text-blue-500">
                          ₹{product.productId.price}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                      <button
                        onClick={() =>
                          updateQuantity(
                            product.variantId,
                            product.size,
                            product.quantity - 1,
                          )
                        }
                        disabled={product.quantity <= 1}
                        className="p-2 hover:bg-white rounded-xl transition-colors disabled:opacity-30"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-bold text-gray-800">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            product.variantId,
                            product.size,
                            product.quantity + 1,
                          )
                        }
                        disabled={product.quantity >= 10}
                        className="p-2 hover:bg-white rounded-xl transition-colors disabled:opacity-30"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        removeItem(product.variantId, product.size)
                      }
                      className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setSelectedItem(product)}
                      className="bg-gray-900 hover:bg-gray-700 text-white text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              );
            })}

            {cart?.cart?.items.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-400 font-bold italic">
                  Your bag is currently empty.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary (35%) */}
        <div className="lg:w-[40%]">
          <div className="sticky top-10">
            <OrderPage />
          </div>
        </div>
      </div>
    </div>

    <CheckoutModal
      isOpen={!!selectedItem}
      onClose={() => setSelectedItem(null)}
      item={selectedItem}
    />
    </>
  );
};

export default CartDetails;
