import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMemberPrice } from "../../utils/pricing";
import { fetchUserCart, fetchUserOrders } from "../../Store/appThunks";
import api from "../../utils/api";
import { MapPin, X, CheckCircle, Loader2, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";

const PAYMENT_METHODS = ["COD", "UPI", "Card"];

// item shape: { productId: { _id, name, price, variants }, variantId, size, quantity }
const CheckoutModal = ({ isOpen, onClose, item }) => {
  const dispatch = useDispatch();
  const userAddress = useSelector((state) => state.app.userAddress);
  const discountPercent = useSelector(
    (state) => state.app.userAddress?.user?.planId?.discountPercent ?? 0,
  );

  const addresses = userAddress?.user?.addresses ?? [];
  const userId = userAddress?.user?._id;

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !item) return null;

  const variant = item.productId.variants.find((v) => v._id === item.variantId);
  const basePrice = item.productId.price;
  const finalPrice = getMemberPrice(basePrice, discountPercent);
  const lineTotal = +(finalPrice * item.quantity).toFixed(2);

  const handleConfirm = async () => {
    if (addresses.length === 0) {
      setError("Please add an address in your profile first.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await api.post("/cart/checkout-item", {
        userId,
        variantId: item.variantId,
        size: item.size,
        shippingAddress: addresses[selectedIdx],
        paymentMethod,
      });

      setSuccess(true);
      // Directly re-fetch both cart and orders so the UI updates immediately
      await dispatch(fetchUserCart(userId));
      await dispatch(fetchUserOrders(userId));
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1800);
    } catch (err) {
      setError(
        err.response?.data?.message || "Checkout failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4">
        {/* ── Header ── */}
        <div className="sticky top-0 bg-white rounded-t-[2rem] px-8 pt-8 pb-4 border-b border-gray-100 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-gray-900">
              ORDER NOW
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Review and confirm your item
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="px-8 py-6 space-y-8">
          {/* ── Item Summary ── */}
          <section>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
              Item
            </h3>
            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
              <div className="w-16 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100">
                <img
                  src={variant?.images?.display}
                  alt="product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-bold text-gray-900 text-sm truncate">
                  {item.productId.name}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Size:{" "}
                  <span className="font-semibold text-gray-600">
                    {item.size}
                  </span>
                  &nbsp;·&nbsp; Qty:{" "}
                  <span className="font-semibold text-gray-600">
                    {item.quantity}
                  </span>
                </p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {discountPercent > 0 ? (
                    <>
                      <span className="text-xs line-through text-gray-400">
                        ₹{basePrice}
                      </span>
                      <span className="text-sm font-black text-blue-600">
                        ₹{finalPrice}
                      </span>
                      <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        {discountPercent}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-black text-blue-600">
                      ₹{basePrice}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-gray-400 mb-0.5">Total</p>
                <p className="text-lg font-black text-gray-900">₹{lineTotal}</p>
              </div>
            </div>
          </section>

          {/* ── Delivery Address ── */}
          <section>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <MapPin size={14} /> Delivery Address
            </h3>

            {addresses.length === 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 text-sm text-amber-700 font-medium">
                No saved addresses. Please add one in your profile.
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map((addr, idx) => (
                  <label
                    key={idx}
                    className={`flex items-start gap-4 cursor-pointer rounded-2xl border-2 px-5 py-4 transition-all ${
                      selectedIdx === idx
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-100 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      className="mt-1 accent-blue-600"
                      checked={selectedIdx === idx}
                      onChange={() => setSelectedIdx(idx)}
                    />
                    <div className="flex-grow">
                      {addr.label && (
                        <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                          {addr.label}
                        </span>
                      )}
                      <p className="mt-1.5 text-sm font-semibold text-gray-800">
                        {addr.line1}
                        {addr.line2 && `, ${addr.line2}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        {addr.city}, {addr.state} — {addr.pincode}
                      </p>
                    </div>
                    {selectedIdx === idx && (
                      <CheckCircle
                        size={18}
                        className="text-blue-500 shrink-0 mt-0.5"
                      />
                    )}
                  </label>
                ))}
              </div>
            )}
          </section>

          {/* ── Payment Method ── */}
          <section>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
              Payment Method
            </h3>
            <div className="flex gap-3 flex-wrap">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={cn(
                    "px-5 py-2.5 rounded-2xl text-sm font-black border-2 transition-all",
                    paymentMethod === method
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300",
                  )}
                >
                  {method}
                </button>
              ))}
            </div>
          </section>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 font-medium bg-red-50 rounded-xl px-4 py-3">
              {error}
            </p>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="sticky bottom-0 bg-white rounded-b-[2rem] px-8 pb-8 pt-4 border-t border-gray-100">
          {success ? (
            <div className="flex items-center justify-center gap-3 bg-green-50 text-green-700 rounded-2xl py-4 font-black text-sm">
              <CheckCircle size={20} />
              Order placed successfully!
            </div>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={loading || addresses.length === 0}
              className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white font-black text-sm tracking-widest uppercase py-4 rounded-2xl transition-all"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  Place Order &nbsp;·&nbsp; ₹{lineTotal}
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
