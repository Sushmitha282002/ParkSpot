import React from "react";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  isAuth,
  isGoogleAuth,
  userRole,
  allowedRoles,
  children,
}) => {
  // Check if user is authenticated or logged in with Google

  if (!isAuth && !isGoogleAuth) return <Navigate to="/login" />;

  // Check if user has the correct role

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
