import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../ContextStore/AdminContext";

const FilterUsers = () => {
  const { allUsers, setFilteredUsers } = useContext(AdminContext);
  const [filter, setFilter] = useState({ search: "", status: "all" });

  useEffect(() => {
    if (!allUsers?.users) return;

    let data = [...allUsers.users];

    // Search Logic
    if (filter.search) {
      data = data.filter(
        (u) =>
          u.name.toLowerCase().includes(filter.search.toLowerCase()) ||
          u.email.toLowerCase().includes(filter.search.toLowerCase()),
      );
    }

    // Status Logic
    if (filter.status !== "all") {
      const targetStatus = filter.status === "active";
      data = data.filter((u) => u.isActive === targetStatus);
    }

    setFilteredUsers(data);
  }, [filter, allUsers, setFilteredUsers]);

  const selectClass =
    "p-2 bg-blue-500 text-white rounded-xl w-full cursor-pointer";

  return (
    <div className="w-[95%] m-auto mt-6 p-6 bg-blue-100 rounded-3xl flex flex-col md:flex-row gap-4 items-end">
      <div className="flex-1 w-full">
        <p className="text-blue-800 mb-1 font-medium">Search User</p>
        <input
          type="text"
          placeholder="Name or Email..."
          className="w-full p-2 rounded-xl border-none shadow-sm outline-none"
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
      </div>
      <div className="w-full md:w-48">
        <p className="text-blue-800 mb-1 font-medium">Status</p>
        <select
          className={selectClass}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
        >
          <option value="all">All Users</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>
      </div>
    </div>
  );
};

export default FilterUsers;
