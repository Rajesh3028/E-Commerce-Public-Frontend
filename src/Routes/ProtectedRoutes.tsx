import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../Store/store";
const ProtectedRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  let Auth = isAuthenticated;
  console.log(Auth);
  return Auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
