import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Box from '@mui/material/Box';
// import { PaletteMode } from '@mui/material';


import BarManagement from './components/ManagementSystem/appBarManagement/BarManagement';
// import Header from './components/ManagementSystem/appBarManagement/example';
import AppAppBar from './components/page/landing-page/components/AppAppBar';
import Navbar from './components/page/dashboard/components/Navbar';
// import Navbar from './components/page/dashboard/components/Navbar';

const ProtectedRoute: React.FC = () => {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);


    const { isAuthenticated } = useAuth();
    console.log("isAuthenticated ", isAuthenticated);
    // // return isAuthenticated ? <Outlet /> : <Navigate to="/signIn" />;

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    // const toggleCustomTheme = () => {
    //     setShowCustomTheme((prev) => !prev);
    // };
    return (
        isAuthenticated ? (
            <>
                {/* <BarManagement /> */}
                {/* <AppAppBar /> */}
                {/* <Navbar /> */}
                <Box sx={{ display: 'flex' }}>

                    <Navbar mode={mode} toggleColorMode={toggleColorMode} />
                </Box>

                <Outlet />
            </>
        ) : <Navigate to="/signIn" />
    );

};

export default ProtectedRoute;
