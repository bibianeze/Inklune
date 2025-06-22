import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PrivateRoute = () => {
  const { loading, user } = useAuthContext();
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  //rbac

  return <Outlet />;
};

export default PrivateRoute;
