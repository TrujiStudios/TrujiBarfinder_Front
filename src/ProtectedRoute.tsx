import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import BarManagement from './components/ManagementSystem/appBarManagement/BarManagement';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    console.log("isAuthenticated ", isAuthenticated);
    // return isAuthenticated ? <Outlet /> : <Navigate to="/signIn" />;
    return (
        isAuthenticated ? (
            <>
                <BarManagement /> {/* BarManagement siempre se renderizará */}
                <Outlet /> {/*  El contenido de la ruta hija se renderizará aquí */}
            </>
        ) : <Navigate to="/signIn" />
    );

};

export default ProtectedRoute;
