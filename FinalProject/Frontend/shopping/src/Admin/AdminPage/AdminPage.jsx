import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../ContextStore/AdminContext";
import axios from "axios";

const AdminPage = () => {
  const { setAdminLoggedIn, setAdminData } = useContext(AdminContext);
  const [stats, setStats] = useState(null);

  // Fetch Dashboard Stats on Load
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/dashboard",
        );
        setStats(response.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };
    fetchStats();
  }, []);
  console.log(stats);
  const HandleLogout = () => {
    setAdminData(null);
    setAdminLoggedIn(false);
    localStorage.removeItem("adminToken"); // Clear token if you're using it
  };

  if (!stats)
    return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <div className="w-[95%] m-auto mt-6 pb-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={HandleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-600 transition-all shadow-md"
        >
          Logout
        </button>
      </div>

      {/* 4 Quick-Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Revenue"
          value={`Rs ${stats.totalRevenue}`}
          color="bg-green-500"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          color="bg-purple-500"
        />
        <StatCard
          title="Active Products"
          value={stats.totalProducts}
          color="bg-orange-500"
        />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-700">Recent Orders</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentOrders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-50 hover:bg-blue-50 transition-all"
              >
                <td className="p-4">
                  <p className="font-bold text-gray-800">
                    {order.userId?.name || "Guest"}
                  </p>
                  <p className="text-xs text-gray-400">{order.userId?.email}</p>
                </td>
                <td className="p-4 font-bold text-blue-600">
                  Rs {order.totalAmount}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(order.placedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Simple reusable component for the top cards
const StatCard = ({ title, value, color }) => (
  <div className={`${color} p-6 rounded-2xl text-white shadow-lg`}>
    <p className="text-sm opacity-80 uppercase font-semibold">{title}</p>
    <p className="text-3xl font-bold mt-1">{value}</p>
  </div>
);

export default AdminPage;
