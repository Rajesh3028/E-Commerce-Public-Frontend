import React from "react";
import { useAppSelector } from "../../Store/store";

const User = () => {
  const { user } = useAppSelector((state) => state.user);

  return <div>{user.first_name ? user.first_name : "No User"}</div>;
};

export default User;
