import React, { useContext } from "react";
import AppContext from "../../ContextStore/AppContext";
import axios from "axios";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import OrderPage from "../OrderSection/OrderPage";

import free from "../../assets/Svgs/memberships/free.svg";
import fan from "../../assets/Svgs/memberships/fan.svg";
import hero from "../../assets/Svgs/memberships/hero.svg";
import legend from "../../assets/Svgs/memberships/legend.svg";

const allMemebers = { Free: free, Fan: fan, Hero: hero, Legend: legend };

const CartDetails = () => {
  const { cart, userAddress, setRefresh } = useContext(AppContext);

  const updateQuantity = async (variantId, size, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    try {
      await axios.patch(
        `http://localhost:5000/api/cart/items/${variantId}/${size}`,
        { quantity: newQuantity },
        { params: { userId: userAddress.user._id } },
      );
      setRefresh((prev) => prev + 1);
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
      setRefresh((prev) => prev + 1);
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
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
                    <p className="text-lg font-black text-blue-500 mt-2">
                      ₹{product.productId.price}
                    </p>
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
  );
};

export default CartDetails;
