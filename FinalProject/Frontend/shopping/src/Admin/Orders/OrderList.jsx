import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../ContextStore/AdminContext";

const OrderList = () => {
  const { filteredOrders, setSelectedOrder } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleSelect = (order) => {
    setSelectedOrder(order); // Save the order to context for the details page
    navigate("/Admin/Orders/selectedOrder");
  };

  if (!filteredOrders) {
    return (
      <div className="text-center p-10 text-gray-500 font-medium">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="w-[95%] m-auto bg-white rounded-2xl shadow-lg overflow-hidden mb-10 border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 border-b border-gray-100">
          <tr>
            <th className="p-4 font-semibold text-gray-600">Customer Name</th>
            <th className="p-4 font-semibold text-gray-600">Total Amount</th>
            <th className="p-4 font-semibold text-gray-600">Payment Status</th>
            <th className="p-4 font-semibold text-gray-600">Order Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr
                key={order._id}
                onClick={() => handleSelect(order)}
                className="border-b border-gray-50 hover:bg-blue-50 transition-colors cursor-pointer group"
              >
                {/* User Info */}
                <td className="p-4 font-medium text-gray-800 group-hover:text-blue-600">
                  <div>
                    <p className="font-bold text-gray-900">
                      {order.userId?.name || "Guest"}
                    </p>
                    <p className="text-xs text-gray-400 font-normal">
                      {order.userId?.email}
                    </p>
                  </div>
                </td>

                {/* Amount */}
                <td className="p-4 font-bold text-blue-600">
                  Rs {order.totalAmount}
                </td>

                {/* Payment Status Badge */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus.toUpperCase()}
                  </span>
                </td>

                {/* Order Status */}
                <td className="p-4">
                  <span
                    className={`capitalize text-sm font-semibold ${
                      order.status === "delivered"
                        ? "text-green-600"
                        : order.status === "cancelled"
                          ? "text-red-500"
                          : "text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-10 text-center text-gray-400">
                No orders match your current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
