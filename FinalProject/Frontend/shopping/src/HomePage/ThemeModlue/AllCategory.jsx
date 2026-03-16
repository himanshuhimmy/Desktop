import React from "react";
import { useContext } from "react";
import AppContext from "../../ContextStore/AppContext";

const AllCategory = () => {
  let { allCategorys } = useContext(AppContext);

  return (
    <div>
      <div className="flex justify-around my-6">
        <div className="flex gap-5 items-center">
          <h1 className="text-2xl font-bold text-blue-700">Collection</h1>

          <div className="flex  gap-4">
            {allCategorys !== null &&
              allCategorys.map((cat) => {
                return (
                  <p className="font-medium" key={cat._id}>
                    {cat.cat}
                  </p>
                );
              })}
          </div>
        </div>
        <div className="flex  gap-4 items-center">
          <p>Male</p>
          <p> Female</p>
          <p> Kids</p>
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
