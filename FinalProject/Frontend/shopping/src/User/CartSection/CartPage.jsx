import React, { useContext } from "react";
import AppContext from "../../ContextStore/AppContext";
import EmptyCart from "./EmptyCart";
import CartDetails from "./CartDetails";

const CartPage = () => {
  const { cart } = useContext(AppContext);

  const isCartEmpty = !cart || !cart.cart || cart.cart.items.length === 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="w-[95%] max-w-7xl m-auto py-10">
        {isCartEmpty ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <EmptyCart />
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-700">
            <CartDetails />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
