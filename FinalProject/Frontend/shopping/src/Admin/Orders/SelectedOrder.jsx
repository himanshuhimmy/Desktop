import React from "react";
import { useSelector } from "react-redux";

const SelectedOrder = () => {
  const selectedOrder = useSelector((state) => state.admin.selectedOrder);

  if (!selectedOrder)
    return <div className="p-10 text-center">No order selected</div>;

  return (
    <div className="w-[90%] m-auto mt-10 p-6 bg-white rounded-3xl shadow-xl">
      <div className="flex justify-between border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <p className="text-gray-500">ID: {selectedOrder._id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer & Shipping */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-blue-600">
            Shipping Address
          </h2>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="font-bold">{selectedOrder.shippingAddress.label}</p>
            <p>{selectedOrder.shippingAddress.line1}</p>
            <p>
              {selectedOrder.shippingAddress.city},{" "}
              {selectedOrder.shippingAddress.state}
            </p>
            <p>{selectedOrder.shippingAddress.pincode}</p>
          </div>
        </div>

        {/* Order Stats */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-blue-600">
            Status Info
          </h2>
          <div className="bg-gray-50 p-4 rounded-xl space-y-2">
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Payment:</strong> {selectedOrder.paymentStatus} (
              {selectedOrder.paymentMethod})
            </p>
            <p>
              <strong>Placed On:</strong>{" "}
              {new Date(selectedOrder.placedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 text-blue-600">
          Items Ordered
        </h2>
        <div className="border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-center">Variant</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3 font-medium">{item.nameAtPurchase}</td>
                  <td className="p-3 text-center text-sm text-gray-500">
                    {item.variantSnapshot.color} | {item.variantSnapshot.size}
                  </td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right">₹{item.priceAtPurchase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 text-right text-2xl font-bold">
        Total Amount: ₹{selectedOrder.totalAmount}
      </div>
    </div>
  );
};

export default SelectedOrder;
