import React from "react";
import EmptyWishList from "./EmptyWishList";
import { useContext } from "react";
import AppContext from "../../ContextStore/AppContext";
import WishListDetails from "./WishListDetails";

const WishListPage = () => {
  let { wishList } = useContext(AppContext);
  return (
    <div className="w-[90%] m-auto">
      {wishList !== null ? <WishListDetails /> : <EmptyWishList />}
    </div>
  );
};

export default WishListPage;
