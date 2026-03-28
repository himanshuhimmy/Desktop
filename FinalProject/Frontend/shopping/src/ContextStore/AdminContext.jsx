import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    JSON.parse(localStorage.getItem("adminLoggedIn")) || false,
  );

  const [adminData, setAdminData] = useState(
    JSON.parse(localStorage.getItem("adminData")) || null,
  );

  useEffect(() => {
    localStorage.setItem("adminLoggedIn", JSON.stringify(adminLoggedIn));
    localStorage.setItem("adminData", JSON.stringify(adminData));
  }, [adminLoggedIn]);

  let value = {
    adminLoggedIn,
    setAdminLoggedIn,
    adminData,
    setAdminData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
