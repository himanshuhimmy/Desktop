import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    JSON.parse(localStorage.getItem("adminLoggedIn")) || false,
  );

  const [adminData, setAdminData] = useState(
    JSON.parse(localStorage.getItem("adminData")) || null,
  );

  const [activeProductId, setActiveProductId] = useState(
    JSON.parse(localStorage.getItem("activeProductId")) || null,
  );

  const [ProductType, setProductType] = useState(
    JSON.parse(localStorage.getItem("ProductType")) || null,
  );

  const [filteredProducts, setFilteredProducts] = useState(
    JSON.parse(localStorage.getItem("filteredProducts") || null),
  );
  const [filteredOrders, setFilteredOrders] = useState(
    JSON.parse(localStorage.getItem("filteredOrders") || null),
  );
  const [filteredUsers, setFilteredUsers] = useState(
    JSON.parse(localStorage.getItem("filteredUsers") || null),
  );
  let [refresh, setRefresh] = useState(0);
  const [allOrders, setAllorders] = useState(
    JSON.parse(localStorage.getItem("allOrders")) || null,
  );
  const [allUsers, setAllUsers] = useState(
    JSON.parse(localStorage.getItem("allUsers")) || null,
  );

  const [selectedOrder, setSelectedOrder] = useState(
    JSON.parse(localStorage.getItem("selectedOrder")) || null,
  );

  const [selectedUser, setSelectedUser] = useState(
    JSON.parse(localStorage.getItem("selectedUser")) || null,
  );

  let [allProducts, setAllProducts] = useState(null);
  const [stats, setStats] = useState(
    JSON.parse(localStorage.getItem("stats")) || null,
  );

  useEffect(() => {
    localStorage.setItem("adminLoggedIn", JSON.stringify(adminLoggedIn));
    localStorage.setItem("adminData", JSON.stringify(adminData));
    localStorage.setItem("ProductType", JSON.stringify(ProductType));
    localStorage.setItem("allOrders", JSON.stringify(allOrders));
    localStorage.setItem("selectedOrder", JSON.stringify(selectedOrder));
    localStorage.setItem("filteredOrders", JSON.stringify(filteredOrders));
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    localStorage.setItem("filteredUsers", JSON.stringify(filteredUsers));
    localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [adminLoggedIn]);

  useEffect(() => {
    localStorage.setItem("selectedOrder", JSON.stringify(selectedOrder));
  }, [selectedOrder]);

  useEffect(() => {
    localStorage.setItem("allOrders", JSON.stringify(allOrders));
  }, [allOrders]);

  useEffect(() => {
    localStorage.setItem("activeProductId", JSON.stringify(activeProductId));
  });

  useEffect(() => {
    let types = async () => {
      let result = await axios.get("http://localhost:5000/api/producttypes");
      setProductType(result.data);
    };
    types();

    let Allorders = async () => {
      let result = await axios.get("http://localhost:5000/api/orders");
      setAllorders(result.data);
    };
    Allorders();

    let AllUSers = async () => {
      try {
        let result = await axios.get("http://localhost:5000/api/users");
        setAllUsers(result.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };
    AllUSers();

    let Product = async () => {
      let result = await axios.get("http://localhost:5000/api/products");
      setAllProducts(result.data);
    };
    Product();

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

  useEffect(() => {
    let Product = async () => {
      let result = await axios.get("http://localhost:5000/api/products");
      setAllProducts(result.data);
    };
    Product();
  }, [refresh]);

  let value = {
    adminLoggedIn,
    setAdminLoggedIn,
    adminData,
    setAdminData,
    activeProductId,
    setActiveProductId,
    ProductType,
    setProductType,
    filteredProducts,
    setFilteredProducts,
    allOrders,
    setAllorders,
    selectedOrder,
    setSelectedOrder,
    filteredOrders,
    setFilteredOrders,
    filteredUsers,
    setFilteredUsers,
    allUsers,
    setAllUsers,
    selectedUser,
    setSelectedUser,
    refresh,
    setRefresh,
    allProducts,
    setAllProducts,
    stats,
    setStats,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
