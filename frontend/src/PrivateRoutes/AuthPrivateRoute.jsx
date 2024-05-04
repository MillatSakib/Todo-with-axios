import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const AuthPrivateRoute = ({ children }) => {
  const { user, loading, routeState } = useContext(AuthContext);

  if (loading) {
    return (
      <span className="loading loading-spinner loading-lg text-success"></span>
    );
  }
  if (user) {
    return <Navigate to={routeState}></Navigate>;
  }
  return children;
};

export default AuthPrivateRoute;
