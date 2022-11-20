import { CircularProgress } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const PrivateOutlet = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <CircularProgress color="success" />;
  }
  return user.uid ? children : <Navigate to="/signin" />;
};

export default PrivateOutlet;
