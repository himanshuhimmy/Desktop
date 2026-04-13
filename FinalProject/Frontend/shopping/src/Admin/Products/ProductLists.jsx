import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveProductId } from "../../Store/adminSlice";

const ProductLists = () => {
  const dispatch = useDispatch();
  const filteredProducts = useSelector((state) => state.admin.filteredProducts);
  const navigate = useNavigate();

  const handleActiveId = (id) => {
    dispatch(setActiveProductId(id));
    navigate(`/Admin/Products/selectedProduct`);
  };

  if (!filteredProducts) {
    return (
      <div className="text-center p-10 text-gray-500">Loading products...</div>
    );
  }
  console.log(filteredProducts);
  return (
    <div className="w-[95%] m-auto bg-white rounded-2xl shadow-lg overflow-hidden mb-10">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 border-b border-gray-100">
          <tr>
            <th className="p-4 font-semibold text-gray-600">Product Name</th>
            <th className="p-4 font-semibold text-gray-600">Category</th>
            <th className="p-4 font-semibold text-gray-600">Theme</th>
            <th className="p-4 font-semibold text-gray-600">Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr
                key={product._id}
                onClick={() => handleActiveId(product._id)}
                className="border-b border-gray-50 hover:bg-blue-50 transition-colors cursor-pointer group"
              >
                <td className="p-4 font-medium text-gray-800 group-hover:text-blue-600">
                  {product.name}
                </td>
                <td className="p-4 text-gray-600">
                  {product.catId?.name || "N/A"}
                </td>
                <td className="p-4 text-gray-600">
                  {product.themeId?.name || "N/A"}
                </td>
                <td className="p-4 font-bold text-blue-600">
                  Rs {product.price}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-10 text-center text-gray-400">
                No products match your current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductLists;
