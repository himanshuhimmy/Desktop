import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setAllUsers } from "../../Store/adminSlice";
import api from "../../utils/api";

const AdminSelectedUser = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.admin.selectedUser);
  const allUsers = useSelector((state) => state.admin.allUsers);

  if (!selectedUser)
    return <div className="p-10 text-center">No user selected</div>;

  const toggleStatus = async () => {
    try {
      if (selectedUser.isActive) {
        await api.delete(`/users/${selectedUser._id}`);
      } else {
        await api.patch(`/users/Activate/${selectedUser._id}`);
      }

      // Update local state immediately
      const updatedUser = { ...selectedUser, isActive: !selectedUser.isActive };
      dispatch(setSelectedUser(updatedUser));

      // Update the main list
      const updatedList = allUsers.users.map((u) =>
        u._id === updatedUser._id ? updatedUser : u,
      );
      dispatch(setAllUsers({ ...allUsers, users: updatedList }));
    } catch (err) {
      alert("Failed to update user status");
    }
  };

  return (
    <div className="w-[90%] m-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-start border-b pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedUser.name}
          </h1>
          <p className="text-blue-600 font-medium">{selectedUser.email}</p>
        </div>
        <button
          onClick={toggleStatus}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${
            selectedUser.isActive
              ? "bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
              : "bg-green-100 text-green-600 hover:bg-green-600 hover:text-white"
          }`}
        >
          {selectedUser.isActive ? "Deactivate User" : "Activate User"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Account Details
          </h3>
          <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
            <p>
              <strong>Phone:</strong> {selectedUser.phone || "Not provided"}
            </p>
            <p>
              <strong>Verified:</strong>{" "}
              {selectedUser.isEmailVerified ? "✅ Yes" : "❌ No"}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Addresses */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Saved Addresses
          </h3>
          <div className="flex flex-wrap gap-4">
            {selectedUser.addresses?.map((addr, index) => (
              <div
                key={index}
                className="bg-blue-50 p-4 rounded-2xl border border-blue-100 w-full sm:w-auto"
              >
                <p className="font-bold text-blue-800">{addr.label}</p>
                <p className="text-sm text-gray-600">
                  {addr.line1}, {addr.city}
                </p>
                <p className="text-sm text-gray-600">{addr.pincode}</p>
              </div>
            ))}
            {selectedUser.addresses?.length === 0 && (
              <p className="text-gray-400">No addresses saved.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSelectedUser;
