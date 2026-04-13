import React from "react";
import EmptyWishList from "./EmptyWishList";
import { useSelector } from "react-redux";
import WishListDetails from "./WishListDetails";

const WishListPage = () => {
  const wishList = useSelector((state) => state.app.wishList);
  return (
    <div className="w-[90%] m-auto">
      {wishList !== null ? <WishListDetails /> : <EmptyWishList />}
    </div>
  );
};

export default WishListPage;
