import React, { useContext, useEffect } from "react";
import AppContext from "../../ContextStore/AppContext";
import axios from "axios";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
} from "lucide-react";

const OrderPage = () => {
  const { setOrders, userData, orders } = useContext(AppContext);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/api/orders?userId=${userData.id}`,
        );
        setOrders(result.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    if (userData?.id) fetchUserOrders();
  }, [userData?.id, setOrders]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 py-12 mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-black italic tracking-tighter text-gray-900 mb-2">
            YOUR ORDERS
          </h1>
          <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">
            Track and manage your LUXE collection purchases
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-8">
        {orders?.orders?.length > 0 ? (
          orders.orders.map((ord) => (
            <div
              key={ord._id}
              className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-500"
            >
              {/* Order Info Header */}
              <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                      Order Placed
                    </p>
                    <p className="font-bold text-gray-800">
                      {new Date(ord.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                      Total Amount
                    </p>
                    <p className="font-black text-blue-500 text-lg">
                      ₹{ord.totalAmount}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                      Ship To
                    </p>
                    <div className="flex items-center gap-1 text-gray-600 font-medium">
                      <MapPin size={14} /> {ord.shippingAddress.city}
                    </div>
                  </div>
                </div>

                <div
                  className={`px-6 py-2 rounded-full border text-xs font-black uppercase tracking-widest flex items-center gap-2 ${getStatusStyle(ord.status)}`}
                >
                  {ord.status === "delivered" ? (
                    <CheckCircle size={14} />
                  ) : (
                    <Clock size={14} />
                  )}
                  {ord.status}
                </div>
              </div>

              {/* Items List */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <div className="h-20 w-16 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center text-gray-400">
                          <Package size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 leading-tight">
                            {item.nameAtPurchase}
                          </h4>
                          <p className="text-xs text-gray-400 font-medium uppercase mt-1">
                            Size: {item.variantSnapshot.size} • Qty:{" "}
                            {item.quantity}
                          </p>
                          <p className="text-sm font-bold text-blue-400 mt-1">
                            ₹{item.priceAtPurchase}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment & Delivery Details */}
                  <div className="bg-gray-50 rounded-3xl p-6 flex flex-col justify-between border border-gray-100">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <CreditCard size={18} className="text-gray-400" />
                        <span className="font-medium">
                          Paid via {ord.paymentMethod}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Truck size={18} className="text-gray-400" />
                        <span className="font-medium">
                          {ord.status === "delivered"
                            ? `Delivered on ${new Date(ord.deliveredAt).toLocaleDateString()}`
                            : "Standard Delivery (3-5 Days)"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
            <Package size={48} className="mx-auto text-gray-200 mb-4" />
            <h2 className="text-2xl font-bold text-gray-400 italic">
              No orders found yet.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
