import profile from "../assets/Svgs/User/user.svg";
import { cn } from "../utils/cn";
import AddressForm from "./AddressFrom/AddressForm";
import { LogOut, Package, ShieldCheck, Calendar } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoggedIn,
  setSelectedProduct,
  setSelectedProductId,
  setUserAddress,
} from "../Store/appSlice";
import api from "../utils/api";

const UserProfile = () => {
  let dispatch = useDispatch();

  let userData = useSelector((state) => state.app.userData);
  let userAddress = useSelector((state) => state.app.userAddress);

  const handleLoggOut = async () => {
    try {
      await api.post("/auth/logout"); // clears HttpOnly cookie on server
    } catch (e) {
      /* ignore */
    }

    // Then clear Redux state as before
    dispatch(setLoggedIn(false));
    dispatch(setUserAddress(null));
    dispatch(setSelectedProductId(null));
    dispatch(setSelectedProduct(null));
  };

  const tierStyles = {
    Hero: {
      text: "text-yellow-500",
      border: "border-yellow-200",
      bg: "bg-white",
    },
    Fan: { text: "text-gray-400", border: "border-gray-200", bg: "bg-gray-50" },
    Free: {
      text: "text-orange-500",
      border: "border-orange-100",
      bg: "bg-white",
    },
    Legend: {
      text: "text-blue-400",
      border: "border-blue-900/20",
      bg: "bg-gradient-to-br from-[#0a1a3a] to-[#0f2a63] text-white",
    },
  };

  const currentTier = userAddress?.user?.planId?.name || "Free";
  const styles = tierStyles[currentTier];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Header Profile Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                className="h-20 w-20 rounded-2xl object-cover border-4 border-gray-50 shadow-sm"
                src={profile}
                alt="user"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 h-5 w-5 rounded-full border-4 border-white"></div>
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 leading-none mb-2">
                {userData.name}
              </h1>
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar size={16} />
                <span className="text-sm font-medium">
                  Member since{" "}
                  {userAddress &&
                    new Date(userAddress.user.createdAt).toLocaleDateString(
                      "en-IN",
                      { month: "long", year: "numeric" },
                    )}
                </span>
              </div>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95">
            Save Profile
          </button>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Address Section (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Package size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Shipping Addresses
              </h2>
            </div>
            <AddressForm />
          </div>

          <div
            className={cn(
              "lg:col-span-5 rounded-4xl p-1 shadow-2xl overflow-hidden",
              styles.border,
            )}
          >
            <div className={cn("h-full p-8 flex flex-col", styles.bg)}>
              <div className="flex justify-between items-start mb-10">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-1">
                    Current Tier
                  </p>
                  <h2
                    className={cn(
                      "text-4xl font-black italic tracking-tighter",
                      styles.text,
                    )}
                  >
                    {currentTier}
                  </h2>
                </div>
                <ShieldCheck size={40} className={styles.text} />
              </div>

              {userAddress && (
                <div className="space-y-8 grow">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/5 p-4 rounded-2xl backdrop-blur-md">
                      <p className="text-[10px] uppercase font-bold opacity-50 mb-1">
                        Benefit
                      </p>
                      <p className="text-2xl font-bold">
                        {userAddress.user.planId.discountPercent}% OFF
                      </p>
                    </div>
                    <div className="bg-black/5 p-4 rounded-2xl backdrop-blur-md">
                      <p className="text-[10px] uppercase font-bold opacity-50 mb-1">
                        Period
                      </p>
                      <p className="text-2xl font-bold">
                        {userAddress.user.planId.durationDays} Days
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-70">
                      Exclusive Perks
                    </h3>
                    <ul className="grid grid-cols-1 gap-3">
                      {userAddress.user.planId.perks.map((perk, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm font-medium"
                        >
                          <div
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              currentTier === "Legend"
                                ? "bg-blue-400"
                                : "bg-gray-400",
                            )}
                          />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <button className="mt-10 w-full py-4 rounded-2xl font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 border border-white/20 transition-all">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>

        {/* Footer Quick Actions */}
        <div className="bg-white rounded-[32px] p-4 shadow-sm border border-gray-100 flex flex-wrap justify-around items-center gap-4">
          <div className="flex items-center gap-3 px-6 py-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
            <Package className="text-blue-500" />
            <span className="font-bold text-gray-700 uppercase tracking-tighter">
              Order History
            </span>
          </div>

          <div className="h-8 w-px bg-gray-100 hidden md:block" />

          <div className="text-sm text-gray-500">
            Expires on{" "}
            <span className="text-blue-600 font-bold">
              {userAddress?.user?.planExpiresAt &&
                new Date(userAddress.user.planExpiresAt).toLocaleDateString(
                  "en-IN",
                )}
            </span>
          </div>

          <div className="h-8 w-px bg-gray-100 hidden md:block" />

          <button
            onClick={handleLoggOut}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all active:scale-95"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
