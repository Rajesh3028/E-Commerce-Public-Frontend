import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../Store/store";
import { useAppDispatch } from "../Store/store";
import { refreshToken } from "../Store/features/authSlice";
const ProtectedRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  let Auth = isAuthenticated;
  const reAuth = async () => {
    
    const response = await dispatch(refreshToken());
    console.log(response);
  }
  if(!Auth){
    reAuth();
  }
  console.log(Auth);
  return Auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
