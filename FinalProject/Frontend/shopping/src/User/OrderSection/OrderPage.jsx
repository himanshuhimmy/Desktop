import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  XCircle,
  RefreshCw,
} from "lucide-react";

const STATUS_FILTERS = [
  { label: "Recent", value: "recent" },
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Refunded", value: "refunded" },
];

const STATUS_STYLES = {
  delivered:  { pill: "bg-green-100 text-green-700 border-green-200",  icon: <CheckCircle size={13} /> },
  shipped:    { pill: "bg-blue-100 text-blue-700 border-blue-200",     icon: <Truck size={13} /> },
  confirmed:  { pill: "bg-indigo-100 text-indigo-700 border-indigo-200", icon: <CheckCircle size={13} /> },
  pending:    { pill: "bg-amber-100 text-amber-700 border-amber-200",  icon: <Clock size={13} /> },
  cancelled:  { pill: "bg-red-100 text-red-700 border-red-200",        icon: <XCircle size={13} /> },
  refunded:   { pill: "bg-purple-100 text-purple-700 border-purple-200", icon: <RefreshCw size={13} /> },
};

const getStatusStyle = (status) =>
  STATUS_STYLES[status] ?? { pill: "bg-gray-100 text-gray-700 border-gray-200", icon: <Clock size={13} /> };

const OrderPage = () => {
  const orders = useSelector((state) => state.app.orders);

  const [activeFilter, setActiveFilter] = useState("recent");

  const allOrders = orders?.orders ?? [];

  const filtered = useMemo(() => {
    let list = [...allOrders];

    if (activeFilter === "recent") {
      // Sort newest first, show all
      return list.sort(
        (a, b) => new Date(b.placedAt || b.createdAt) - new Date(a.placedAt || a.createdAt),
      );
    }

    if (activeFilter === "all") {
      return list.sort(
        (a, b) => new Date(b.placedAt || b.createdAt) - new Date(a.placedAt || a.createdAt),
      );
    }

    // Status filter — keep newest-first within the group
    return list
      .filter((o) => o.status === activeFilter)
      .sort(
        (a, b) => new Date(b.placedAt || b.createdAt) - new Date(a.placedAt || a.createdAt),
      );
  }, [allOrders, activeFilter]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* ── Header ── */}
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

      <div className="max-w-6xl mx-auto px-6">

        {/* ── Filter Pills ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {STATUS_FILTERS.map((f) => {
            const count =
              f.value === "recent" || f.value === "all"
                ? allOrders.length
                : allOrders.filter((o) => o.status === f.value).length;

            const isActive = activeFilter === f.value;

            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border-2 transition-all ${
                  isActive
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                }`}
              >
                {f.label}
                <span
                  className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Orders List ── */}
        <div className="space-y-8">
          {filtered.length > 0 ? (
            filtered.map((ord) => {
              const { pill, icon } = getStatusStyle(ord.status);
              return (
                <div
                  key={ord._id}
                  className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-500"
                >
                  {/* Order Header */}
                  <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-8 flex-wrap">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                          Order Placed
                        </p>
                        <p className="font-bold text-gray-800">
                          {new Date(ord.placedAt || ord.createdAt).toLocaleDateString("en-IN", {
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
                      {ord.discountAmount > 0 && (
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                            You Saved
                          </p>
                          <p className="font-black text-green-500">
                            ₹{ord.discountAmount}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                          Ship To
                        </p>
                        <div className="flex items-center gap-1 text-gray-600 font-medium text-sm">
                          <MapPin size={14} />
                          {ord.shippingAddress?.city}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`px-5 py-2 rounded-full border text-xs font-black uppercase tracking-widest flex items-center gap-2 ${pill}`}
                    >
                      {icon}
                      {ord.status}
                    </div>
                  </div>

                  {/* Items + Payment */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex gap-4 items-center">
                            <div className="h-20 w-16 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center text-gray-300">
                              <Package size={24} />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 leading-tight">
                                {item.nameAtPurchase}
                              </h4>
                              <p className="text-xs text-gray-400 font-medium uppercase mt-1">
                                Size: {item.variantSnapshot?.size} &nbsp;·&nbsp; Qty: {item.quantity}
                              </p>
                              <p className="text-sm font-black text-blue-400 mt-1">
                                ₹{item.priceAtPurchase}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

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
                                ? `Delivered on ${new Date(ord.deliveredAt).toLocaleDateString("en-IN")}`
                                : "Standard Delivery (3–5 Days)"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
              <Package size={48} className="mx-auto text-gray-200 mb-4" />
              <h2 className="text-2xl font-bold text-gray-400 italic">
                {activeFilter === "recent" || activeFilter === "all"
                  ? "No orders yet."
                  : `No ${activeFilter} orders.`}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
