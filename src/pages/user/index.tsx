import type { NextPage } from "next";
import React from "react";
import { api } from "y/utils/api";

const Users: NextPage = () => {
  const { data: usersList } = api.users.getAllUsers.useQuery();
  console.log(usersList);

  return <div>Users List</div>;
};

export default Users;
