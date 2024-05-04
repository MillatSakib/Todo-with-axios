import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading, routeState, setRouteState } = useContext(AuthContext);
  setRouteState(location.pathname);
  if (loading) {
    return (
      <span className="loading loading-spinner loading-lg mx-auto text-success"></span>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoutes;
