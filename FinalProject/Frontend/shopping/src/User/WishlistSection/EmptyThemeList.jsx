import React from "react";
import { NavLink } from "react-router-dom";

const EmptyThemeList = () => {
  return (
    <div>
      <h1 className="text-4xl text-center font-semibold text-blue-500 ">
        {" "}
        Slected Theme has No Product Of Your Intrest{" "}
      </h1>
      <div className="mt-6 text-center">
        <NavLink
          to={"/"}
          className="px-6 py-3 bg-blue-400 text-white hover:bg-blue-600 transition-all duration-300"
        >
          EXPLORE COLLECTIONS
        </NavLink>
      </div>
    </div>
  );
};

export default EmptyThemeList;
