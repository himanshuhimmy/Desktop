import React from "react";
import { NavLink } from "react-router-dom";

const SupportFooter = () => {
  return (
    <footer className="p-7 flex justify-around shadow-2xl ">
      <h1 className="flex">
        <img src="" alt="logo" />
        <h1 className="text-xl font-bold">LUXE</h1>
      </h1>
      <p className="flex gap-4 font-extralight">
        <NavLink
          to="/support/terms"
          className={({ isActive }) =>
            isActive ? "text-blue-400 mb-1 font-medium" : ""
          }
        >
          Terms & Conditions
        </NavLink>
        <NavLink
          to="/support/contact"
          className={({ isActive }) =>
            isActive ? "text-blue-400 mb-1 font-medium" : ""
          }
        >
          ContactUs
        </NavLink>
        <NavLink
          to="/support/policy"
          className={({ isActive }) =>
            isActive ? "text-blue-400 mb-1 font-medium" : ""
          }
        >
          Privacy & policy
        </NavLink>
      </p>
      <p className="font-extralight text-xs">
        © 2023 LUXE International. All rights reserved.
      </p>
    </footer>
  );
};

export default SupportFooter;
