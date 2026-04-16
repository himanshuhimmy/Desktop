import React from "react";
import empty from "../../assets/Cart/Empty.png";
import { NavLink } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-sm mx-auto text-center">
        <div className="w-full overflow-hidden my-4">
          <img
            className="w-full object-contain hover:scale-105 transition-all duration-300"
            src={empty}
            alt="emptyCart"
          />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Your Cart is Currently Empty
        </h1>
        <p className="text-lg md:text-xl font-light">
          It seems you haven't added any luxury pieces to your cart yet. Your
          next masterpiece is waiting to be discovered.
        </p>
        <div className="my-7 p-3">
          <NavLink
            to={"/"}
            className="px-4 py-3 bg-blue-400 text-white hover:bg-blue-600 transition-all duration-300"
          >
            EXPLORE COLLECTIONS
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
