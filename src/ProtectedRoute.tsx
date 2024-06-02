import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    console.log("isAuthenticated ", isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/signIn" />;
};

export default ProtectedRoute;
