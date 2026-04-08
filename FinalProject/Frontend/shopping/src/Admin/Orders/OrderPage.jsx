import React from "react";
import OrderList from "./OrderList";
import FilterOrders from "./FilterOrders";

const OrderPage = () => {
  return (
    <div>
      <FilterOrders />
      <OrderList />
    </div>
  );
};

export default OrderPage;
