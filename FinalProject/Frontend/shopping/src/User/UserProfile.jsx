import React, { useContext, useEffect, useState } from "react";
import AppContext from "../ContextStore/AppContext";

import order from "../assets/Svgs/User/order.svg";
import edit from "../assets/Svgs/User/edit.svg";
import profile from "../assets/Svgs/User/user.svg";
import axios from "axios";

const UserProfile = () => {
  let {
    setLoggedIn,
    userData,
    userAddress,
    setUserAddress,
    inputText,
    setInputText,
    setSelectedProductId,
    setSelectedProduct,
  } = useContext(AppContext);

  function handleLoggOut() {
    setLoggedIn(false);
    setUserAddress(null);
    setSelectedProductId(null);
    setSelectedProduct(null);
  }
  let inputClass =
    "border border-gray-200 p-1 mx-3 focus:text-blue-500 rounded-xl w-full";

  const tierColors = {
    Hero: "text-yellow-400",
    Fan: "text-gray-300",
    Free: "text-orange-500",
    Legend: "text-[#3e62e0]",
  };

  const bgColours = {
    Hero: "bg-white",
    Fan: "bg-[#fcfffe]",
    Free: "bg-white",
    Legend:
      "bg-gradient-to-br from-[#0a1a3a] to-[#0f2a63] rounded-2xl p-8 text-white",
  };

  const borderColour = {
    Hero: "border border-yellow-400",
    Fan: "border border-gray-300",
    Free: "border border-gray-300",
    Legend: "border border-blue-500",
  };

  function handleOnchange(value, field) {
    setInputText((prev) => ({ ...prev, [field]: value }));
  }
  return (
    <div className="my-7">
      <div className="w-[80%] m-auto ">
        <div className="p-6 rounded-2xl shadow-xl border border-gray-400 flex justify-between">
          <div className="flex">
            <img
              className="h-15 rounded-b-full shadow-2xs border border-gray-100"
              src={profile}
              alt="user"
            />
            <div>
              <h1 className="flex justify-center items-center mx-4 font-bold text-2xl text-blue-400">
                {userData.name}
              </h1>
              <h1 className="mt-4">
                <label
                  className=" text-blue-400 mx-4
                "
                >
                  Joined us
                </label>
                {userAddress !== null &&
                  new Date(userAddress.user.createdAt).toLocaleString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            <button>save changes</button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap w-[90%] m-auto mt-6 justify-around">
        <div
          className={`w-[40%] rounded-2xl shadow-2xl border border-gray-300 p-6`}
        >
          <h1 className="text-2xl underline font-bold mb-3 text-center text-blue-400">
            Address
          </h1>
          {userAddress !== null &&
            userAddress.user.addresses.map((address) => {
              return (
                <div
                  key={address.label}
                  className="flex justify-around items-center "
                >
                  <div className="flex flex-col gap-2">
                    <div>
                      <input
                        onChange={(e) =>
                          handleOnchange(e.target.value, "label")
                        }
                        className={inputClass}
                        value={address.label}
                        type="text"
                      />
                    </div>
                    <div>
                      <input
                        onChange={(e) =>
                          handleOnchange(e.target.value, "line1")
                        }
                        className={inputClass}
                        value={address.line1}
                        type="text"
                      />
                    </div>
                    <div>
                      <input
                        onChange={(e) =>
                          handleOnchange(e.target.value, "pincode")
                        }
                        className={inputClass}
                        value={address.pincode}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      onChange={(e) => handleOnchange(e.target.value, "city")}
                      className={inputClass}
                      value={address.city}
                      type="text"
                    />
                    <input
                      onChange={(e) => handleOnchange(e.target.value, "state")}
                      className={inputClass}
                      value={address.state}
                      type="text"
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className={`w-[40%] rounded-2xl ${borderColour[userAddress?.user?.planId?.name]} ${bgColours[userAddress?.user?.planId?.name]} shadow-2xl border p-6`}
        >
          <h1 className="text-2xl underline font-bold mb-3 text-center text-blue-400">
            Membership
          </h1>

          <div className="p-4">
            {userAddress !== null && (
              <div
                className={`
      max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-lg transition-all 
      ${bgColours[userAddress.user.planId.name]} 
      ${borderColour[userAddress.user.planId.name]}
    `}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-white/10">
                    <h1
                      className={`text-2xl font-black uppercase tracking-tight mb-6 ${tierColors[userAddress.user.planId.name]}`}
                    >
                      {userAddress.user.planId.name}
                    </h1>

                    <div className="space-y-4 opacity-90">
                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-60 mb-1">
                          Benefit
                        </p>
                        <p className="text-xl font-semibold">
                          {userAddress.user.planId.discountPercent}% Discount
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-60 mb-1">
                          Member Since
                        </p>
                        <p className="font-medium">
                          {userAddress?.user?.planId?.createdAt &&
                            new Date(
                              userAddress.user.planId.createdAt,
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-widest opacity-60 mb-1">
                          Validity
                        </p>
                        <p className="font-medium">
                          {userAddress.user.planId.durationDays} Days
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-8 bg-black/5 backdrop-blur-sm">
                    <h2 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-70">
                      Exclusive Perks
                    </h2>
                    <ul className="space-y-3">
                      {userAddress.user.planId.perks.map((perk, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${tierColors[userAddress.user.planId.name].replace("text-", "bg-") || "bg-current"}`}
                          />
                          <span className="text-sm font-medium">{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          {userAddress !== null && console.log(userAddress.user)}
        </div>
      </div>

      <div className="w-[80%] m-auto">
        <div className="my-5 p-4 rounded-xl shadow-xl border border-gray-200 flex justify-around items-center">
          <div className="flex items-center">
            <img className="h-6 m-3" src={order} alt="" /> orders
          </div>
          <div>
            <p>
              MemberShip Expires at
              <label className="text-blue-400 font-bold" htmlFor="">
                {userAddress?.user?.planExpiresAt &&
                  new Date(
                    userAddress.user.planId.createdAt,
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
              </label>
            </p>
            <div className="flex justify-center mt-4">
              <button>Upgrade / Reniew</button>
            </div>
          </div>
          <button
            className="bg-amber-500 px-3 py-2 rounded-2xl hover:bg-amber-700 transition-all duration-300 text-white "
            onClick={handleLoggOut}
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
