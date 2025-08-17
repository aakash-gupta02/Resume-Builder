import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    toast.warning("Please login to access this page.");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
