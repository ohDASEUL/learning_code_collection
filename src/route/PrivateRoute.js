import React from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import ProductDetail from "../pages/ProductDetail";

const PrivateRoute = ({ authenticate }) => {
  const location = useLocation();
  console.log("lll", location);
  return authenticate ? (
    <ProductDetail />
  ) : (
    <Navigate to="/login" replace state={{ to: location }} />
  );
};

export default PrivateRoute;