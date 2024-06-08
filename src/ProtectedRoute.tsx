import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Box from "@mui/material/Box";
import { PaletteMode } from "@mui/material";

import Navbar from "./components/page/dashboard/components/Navbar";

const ProtectedRoute: React.FC = () => {
  const [mode, setMode] = React.useState<PaletteMode>("light");

  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated ", isAuthenticated);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return isAuthenticated ? (
    <>
      {/* <BarManagement /> */}
      {/* <AppAppBar /> */}
      {/* <Navbar /> */}
      <Box sx={{ display: "flex" }}>
        <Navbar mode={mode} toggleColorMode={toggleColorMode} />
      </Box>

      <Outlet />
    </>
  ) : (
    <Navigate to="/signIn" />
  );
};

export default ProtectedRoute;
