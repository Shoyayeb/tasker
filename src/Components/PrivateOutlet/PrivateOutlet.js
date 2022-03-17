import { CircularProgress } from "@mui/material";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const PrivateOutlet = () => {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    if (isLoading) {
        return <CircularProgress color="success" />;
    }
    return user.uid ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default PrivateOutlet;