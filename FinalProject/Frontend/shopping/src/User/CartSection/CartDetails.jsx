import React from "react";
import { useContext } from "react";
import AppContext from "../../ContextStore/AppContext";

import free from "../../assets/Svgs/memberships/free.svg";
import fan from "../../assets/Svgs/memberships/fan.svg";
import hero from "../../assets/Svgs/memberships/hero.svg";
import legend from "../../assets/Svgs/memberships/legend.svg";
import axios from "axios";
const allMemebers = {
  Free: free,
  Fan: fan,
  Hero: hero,
  Legend: legend,
};

const CartDetails = () => {
  let { cart, userAddress, setRefresh } = useContext(AppContext);
  console.log(cart.cart.items.map((product) => product.variantId));

  async function addQuantity(id, size) {
    let Dataquantity = cart.cart.items.flatMap((product) =>
      product.variantId === id ? product.quantity : "",
    )[0];

    let quantity = Dataquantity + 1;

    await axios.patch(
      `http://localhost:5000/api/cart/items/${id}/${size}`,
      { quantity },
      {
        params: { userId: userAddress.user._id },
      },
    );

    setRefresh((prev) => prev + 1);
  }
  async function subQuantity(id, size) {
    let Dataquantity = cart.cart.items.flatMap((product) =>
      product.variantId === id ? product.quantity : "",
    )[0];

    let quantity = Dataquantity - 1;

    await axios.patch(
      `http://localhost:5000/api/cart/items/${id}/${size}`,
      { quantity },
      {
        params: { userId: userAddress.user._id },
      },
    );

    setRefresh((prev) => prev + 1);
  }

  async function removeItem(variantId, size) {
    await axios.delete(
      `http://localhost:5000/api/cart/items/${variantId}/${size}`,
      {
        params: { userId: userAddress.user._id },
      },
    );

    setRefresh((prev) => prev + 1);
  }

  return (
    <div className="my-6 flex m-auto justify-between">
      <div className="w-[60%]">
        <div>
          <h1 className="text-6xl font-semibold mb-6">Your Shopping Bag</h1>
          <div className="flex items-center  gap-5">
            <p className="text-xl font-light  ">
              <label className="">
                {cart?.cart?.items?.length} {""}
              </label>
              Items selected for your premium collection
            </p>
            <div className="bg-blue-100 border border-blue-500 rounded-2xl px-4 py-2 flex justify-around shadow-xl  shadow-blue-200 hover:shadow-2xl transition-all   duration-300">
              <div className="">
                <img
                  className="h-11"
                  src={allMemebers[userAddress.user.planId.name]}
                  alt="svg"
                />
              </div>
              <p className="text-3xl font-bold text-blue-400">
                {userAddress.user.planId.name}
              </p>
            </div>
          </div>

          <hr className=" m-7 border-blue-200 shadow-2xl" />

          <div className="my-5">
            <div className="flex flex-col gap-4 w-full">
              {cart?.cart.items.map((product) => {
                const variant = product.productId.variants.find(
                  (vr) => vr._id === product.variantId,
                );

                return (
                  <div
                    key={product.variantId}
                    className="w-11/12 m-auto rounded-2xl shadow-md p-4 border border-gray-200"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-30 h-30 overflow-hidden rounded-xl shrink-0">
                        <img
                          className="w-full h-full object-cover"
                          src={variant?.images?.display}
                          alt="image"
                        />
                      </div>

                      <div>
                        <h1 className="font-semibold text-xl">
                          {product.productId.name}
                        </h1>
                        <p className="text-gray-600">
                          ₹{product.productId.price}
                        </p>
                        <p className="text-sm">Size: {product.size}</p>
                      </div>
                    </div>
                    <div className="flex w-[50%] m-auto justify-between mb-3">
                      <div className="flex py-2  justify-center items-center gap-3">
                        <button
                          onClick={() =>
                            addQuantity(product.variantId, product.size)
                          }
                          disabled={product.quantity === 10}
                          className={`px-3 py-1 bg-gray-400 rounded-xl font-bold text-xl disabled:bg-gray-200`}
                        >
                          +
                        </button>
                        <input
                          className="w-[10%]"
                          value={product.quantity}
                          type="text"
                        />
                        <button
                          disabled={product.quantity === 1}
                          onClick={() =>
                            subQuantity(product.variantId, product.size)
                          }
                          className={`px-3 py-1 bg-gray-400 rounded-xl font-bold text-xl disabled:bg-gray-200`}
                        >
                          -
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(product.variantId, product.size)
                        }
                        className="text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/*!  order data */}
      <div className="w-[30%] "> orders </div>
    </div>
  );
};

export default CartDetails;
