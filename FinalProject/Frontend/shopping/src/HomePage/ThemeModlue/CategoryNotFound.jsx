import React from "react";
import tshirt from "../../assets/Svgs/t-shirt.svg";

const CategoryNotFound = ({ theme }) => {
  return (
    <div className="h-[60vh] w-[50%] m-auto flex flex-col justify-center items-center py-9">
      <div className="bg-[#f9fafc] rounded-2xl shadow-2xl p-5 mb-4">
        <img className="h-30" src={tshirt} alt="tshirt" />
      </div>

      <div className="text-center">
        <p className="text-xl text-blue-500 underline">
          Curated Collection Update
        </p>
        <h1 className="text-5xl font-bold mb-4">Currently Unavailable</h1>
        <p className="text-xl font-normal">
          While our <label className="font-bold text-blue-500"> {theme} </label>
          collection doesn't feature hoodies at this moment, our designers are
          working on expanding our high-end essentials. In the meantime, you
          might enjoy these alternative curated styles.
        </p>
      </div>
    </div>
  );
};

export default CategoryNotFound;
