import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../Store/adminSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const filteredUsers = useSelector((state) => state.admin.filteredUsers);
  const navigate = useNavigate();

  const handleSelect = (user) => {
    dispatch(setSelectedUser(user));
    navigate("/Admin/Users/selectedUser");
  };

  if (!filteredUsers)
    return (
      <div className="text-center p-10 text-gray-500">Loading users...</div>
    );

  return (
    <div className="w-[95%] m-auto bg-white rounded-2xl shadow-lg overflow-hidden my-6 border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 border-b border-gray-100">
          <tr>
            <th className="p-4 font-semibold text-gray-600">User Profile</th>
            <th className="p-4 font-semibold text-gray-600">Phone</th>
            <th className="p-4 font-semibold text-gray-600">Status</th>
            <th className="p-4 font-semibold text-gray-600">Joined Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr
                key={user._id}
                onClick={() => handleSelect(user)}
                className="border-b border-gray-50 hover:bg-blue-50 transition-colors cursor-pointer group"
              >
                <td className="p-4 font-medium text-gray-800 group-hover:text-blue-600">
                  <p className="font-bold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-400 font-normal">
                    {user.email}
                  </p>
                </td>
                <td className="p-4 text-gray-600">{user.phone || "N/A"}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-4 text-gray-500 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-10 text-center text-gray-400">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
