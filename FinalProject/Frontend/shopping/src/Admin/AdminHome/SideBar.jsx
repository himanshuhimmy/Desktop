import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import dashboard from "../../assets/Svgs/Admin/Sidebar/bar.svg";
import order from "../../assets/Svgs/Admin/Sidebar/cart.svg";
import user from "../../assets/Svgs/Admin/Sidebar/users.svg";
import product from "../../assets/Svgs/Admin/Sidebar/bag.svg";

const baseClass =
  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mb-1";
const activeClass = "bg-blue-600 text-white shadow-md shadow-blue-200";
const inactiveClass = "text-gray-500 hover:bg-blue-50 hover:text-blue-600";

const SideBar = () => {
  const adminData = useSelector((state) => state.admin.adminData);

  const username = adminData?.admin?.username || "Admin";
  const role = adminData?.admin?.role || "Manager";

  return (
    <div className="p-4 border-r border-gray-200 h-full flex flex-col justify-between bg-white">
      <div>
        <div className="px-2 mb-6">
          <h1 className="text-xl font-bold text-gray-800">Main Menu</h1>
        </div>

        <nav className="flex flex-col gap-1">
          <NavLink
            to="/Admin/dashboard"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <img
              src={dashboard}
              alt="dash"
              className="h-5 brightness-0 opacity-70 group-active:invert"
            />
            <p className="font-medium">Dashboard</p>
          </NavLink>

          <NavLink
            to="/Admin/Products"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <img src={product} alt="prod" className="h-5 opacity-70" />
            <p className="font-medium">Products</p>
          </NavLink>

          <NavLink
            to="/Admin/orders"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <img src={order} alt="ord" className="h-5 opacity-70" />
            <p className="font-medium">All Orders</p>
          </NavLink>

          <NavLink
            to="/Admin/users"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <img src={user} alt="cust" className="h-5 opacity-70" />
            <p className="font-medium">Customers</p>
          </NavLink>
        </nav>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <NavLink
          to="/Admin/AdminPage"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-2xl transition-all ${
              isActive
                ? "bg-blue-50 border border-blue-100"
                : "hover:bg-gray-50 border border-transparent"
            }`
          }
        >
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
            {username.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">
              {username}
            </p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
              {role}
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
