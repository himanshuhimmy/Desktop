import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../ContextStore/AdminContext";

const FilterOrders = () => {
  const { allOrders, setFilteredOrders } = useContext(AdminContext);

  const [filter, setFilter] = useState({
    status: "all",
    payment: "all",
  });

  useEffect(() => {
    if (!allOrders?.orders) return;

    let data = [...allOrders.orders];

    // Filter by Order Status (delivered, pending, etc.)
    if (filter.status !== "all") {
      data = data.filter((order) => order.status === filter.status);
    }

    // Filter by Payment Status (paid, unpaid)
    if (filter.payment !== "all") {
      data = data.filter((order) => order.paymentStatus === filter.payment);
    }

    setFilteredOrders(data);
  }, [filter, allOrders, setFilteredOrders]);

  const selectClass =
    "p-2 bg-blue-500 text-white rounded-xl w-full cursor-pointer";

  return (
    <div className="w-[95%] m-auto mt-6 p-4 bg-blue-100 rounded-2xl flex gap-4 mb-5">
      <div className="flex-1">
        <p className="text-blue-800 mb-1 font-medium">Order Status</p>
        <select
          className={selectClass}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="on the way">On the Way</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="flex-1">
        <p className="text-blue-800 mb-1 font-medium">Payment Status</p>
        <select
          className={selectClass}
          onChange={(e) => setFilter({ ...filter, payment: e.target.value })}
        >
          <option value="all">All Payments</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>
    </div>
  );
};

export default FilterOrders;
