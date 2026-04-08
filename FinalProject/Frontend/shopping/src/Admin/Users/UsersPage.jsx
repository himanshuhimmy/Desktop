import React from "react";
import FilterUsers from "./FilterUsers";

import UserList from "./UserList";

const UsersPage = () => {
  return (
    <div>
      <FilterUsers />
      <UserList />
    </div>
  );
};

export default UsersPage;
