import React from "react";
import cart from "./../assets/Svgs/cart.svg";
import wishlist from "./../assets/Svgs/wishlist.svg";
import profile from "./../assets/Svgs/profile.svg";

const HeadderPage = () => {
  return (
    <header className="flex shadow-2xl justify-around py-3">
      <div className="flex mx-4">
        img
        <h1 className="text-3xl font-bold">Luxe</h1>
      </div>
      <div></div>
      <div className="flex gap-6 mx-4 font-semibold">
        <img className="h-7" src={cart} alt="Cart" />
        <img className="h-7" src={wishlist} alt="wishlist" />
        <img className="h-7" src={profile} alt="profile" />
      </div>
    </header>
  );
};

export default HeadderPage;
