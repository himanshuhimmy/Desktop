import React from "react";
import cart from "./../assets/Svgs/cart.svg";
import wishlist from "./../assets/Svgs/wishlist.svg";
import profile from "./../assets/Svgs/profile.svg";
import { NavLink } from "react-router-dom";

const HeadderPage = () => {
  return (
    <div className="px-7 shadow-2xl ">
      <header className="flex  items-center justify-between py-3">
        <NavLink to={"/"}>
          <div className="flex mx-4 ">
            img
            <h1 className="text-3xl font-bold">Luxe</h1>
          </div>
        </NavLink>
        <div></div>
        <div className="flex gap-6 mx-4 font-semibold">
          <NavLink to={"/UserProfile/UserCart"}>
            <img className="h-7" src={cart} alt="Cart" />
          </NavLink>
          <NavLink to={"/UserProfile/Wishlist"}>
            <img className="h-7" src={wishlist} alt="wishlist" />
          </NavLink>
          <NavLink to={"/UserProfile"}>
            <img className="h-7" src={profile} alt="profile" />
          </NavLink>
        </div>
      </header>
    </div>
  );
};

export default HeadderPage;
