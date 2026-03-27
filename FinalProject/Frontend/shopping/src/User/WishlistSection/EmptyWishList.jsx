import React from "react";
import List from "../../assets/Wishlist/Wish.jpg";
import { NavLink } from "react-router-dom";

const EmptyWishList = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-[50%] mb-6">
        <img className="w-full object-contain" src={List} alt="empty" />
      </div>

      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          Start Your Curated Collection
        </h1>

        <p className="text-gray-600">
          Your wishlist is a place for your most desired pieces. Save items here
          to build your personal gallery of luxury.
        </p>

        <div className="mt-6">
          <NavLink
            to={"/"}
            className="px-6 py-3 bg-blue-400 text-white hover:bg-blue-600 transition-all duration-300"
          >
            EXPLORE COLLECTIONS
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default EmptyWishList;
