import React from "react";
import { useContext } from "react";
import AppContext from "../../ContextStore/AppContext";
import EmptyCart from "./EmptyCart";
import CartDetails from "./CartDetails";

const CartPage = () => {
  let { cart, setCart } = useContext(AppContext);

  return (
    <div>
      <div className="w-[90%] m-auto h-screen">
        {cart === null ? <EmptyCart /> : <CartDetails />}
        <div></div>
      </div>
    </div>
  );
};

export default CartPage;
