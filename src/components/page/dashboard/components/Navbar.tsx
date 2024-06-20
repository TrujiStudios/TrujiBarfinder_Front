// import * as React from "react";
// import { styled } from "@mui/material/styles";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
// import MuiToolbar from "@mui/material/Toolbar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ToggleColorMode from "./ToggleColorMode";
import SideNav from "./SideNav";
import MenuButton from "./MenuButton";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import OptionsMenu from "./OptionsMenu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { styles } from "../../../../themes/NavbarThemes";
import { Toolbar } from "../../../../themes/NavbarThemes";

import { NavbarHoook } from "../../../../hook/NavbarHoook";
import { accountList, accountListProduct } from "../../../../helper/AccounList";
import { NavBarProps } from "../../../../interface/navbarInterface";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function Navbar({ mode, toggleColorMode }: NavBarProps) {
  const {
    open,
    value,
    anchorElAnalytics,
    anchorElClients,
    anchorElProducts,
    anchorElExample,
    handleChange,
    toggleDrawer,
    handleAnalyticsMenuOpen,
    handleClientsMenuOpen,
    handleProductsMenuOpen,
    handleExampleMenuOpen,
    handleMenuClose
  } = NavbarHoook();

  return (
    <>
      <AppBar
        position="fixed"
        sx={(theme) => ({
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: theme.palette.divider
        })}
      >
        <Toolbar variant="regular">
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            justifyContent={{ xs: "flex-end", md: "space-between" }}
            flexGrow={1}
            sx={{ width: "100%", display: { xs: "none", md: "flex" } }}
          >
            <NavbarBreadcrumbs />
            <Stack direction="row" gap={1}>
              <MenuButton showBadge>
                <NotificationsRoundedIcon />
              </MenuButton>
              <OptionsMenu />
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexGrow={1}
            sx={{ width: "100%", display: { sm: "flex", md: "none" } }}
          >
            <NavbarBreadcrumbs />
            <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuRoundedIcon />
            </MenuButton>
            <SideNav
              open={open}
              toggleDrawer={toggleDrawer}
              mode={mode}
              toggleColorMode={toggleColorMode}
            />
          </Stack>
          <Tabs value={value} onChange={handleChange} aria-label="navbar tabs">
            <Tab label="Home" {...a11yProps(0)} />
            <Tab
              label="Vender"
              component={Link}
              to="/dashboard/sell"
              {...a11yProps(0)}
            />
            <Tab
              label="Analytics"
              // aria-controls="analytics-menu"
              aria-haspopup="true"
              onClick={handleAnalyticsMenuOpen}
              {...a11yProps(1)}
            />

            {/* // Tab para Clients */}
            <Tab
              label="Productos"
              // aria-controls="clients-menu"
              aria-haspopup="true"
              onClick={handleClientsMenuOpen}
              {...a11yProps(2)}
            />
            {/* // Tab para Productos */}

            {/* MEsas */}
            <Tab
              label="Mesas"
              // aria-controls="clients-menu"
              aria-haspopup="true"
              onClick={handleProductsMenuOpen}
              {...a11yProps(2)}
            />

            {/* // Tab para Example */}
            <Tab
              label="Example"
              // aria-controls="clients-menu"
              aria-haspopup="true"
              onClick={handleExampleMenuOpen}
              {...a11yProps(2)}
            />
            {/* Fin */}
          </Tabs>
        </Toolbar>

        {/* Menú desplegable para Analytics */}
        <Menu
          id="analytics-menu"
          anchorEl={anchorElAnalytics}
          open={Boolean(anchorElAnalytics)}
          onClose={handleMenuClose}
          keepMounted
        >
          <MenuItem onClick={handleMenuClose}>
            <Link style={styles.linkNavbar} to="/dashboard/tables">
              Mesas
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>Performance</MenuItem>
        </Menu>

        {/* Menú desplegable para Clients */}
        <Menu
          id="clients-menu"
          anchorEl={anchorElClients}
          open={Boolean(anchorElClients)}
          onClose={handleMenuClose}
          keepMounted
        >
          <List>
            {accountListProduct.map((item, index) => (
              <ListItem onClick={handleMenuClose} key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={<Link to={item.route}>{item.label}</Link>}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Menu>

        {/* // Menú desplegable para Products|Productos */}
        {/* Example */}
        <Menu
          id="products-menu"
          anchorEl={anchorElProducts}
          open={Boolean(anchorElProducts)}
          onClose={handleMenuClose}
          keepMounted
        >
          <MenuItem onClick={handleMenuClose}>
            <Link style={styles.linkNavbar} to="/dashboard/tables">
              Mesas
            </Link>
          </MenuItem>
          <Divider />

          <MenuItem onClick={handleMenuClose}>
            <Link style={styles.linkNavbar} to="/dashboard/product">
              Mesa Uno
            </Link>
          </MenuItem>
        </Menu>

        {/* //Fin */}

        {/* Inicio Prueba */}

        <Menu
          id="example-menu"
          anchorEl={anchorElExample}
          open={Boolean(anchorElExample)}
          onClose={handleMenuClose}
          keepMounted
        >
          <List>
            {accountList.map((item, index) => (
              <ListItem onClick={handleMenuClose} key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={<Link to={item.route}>{item.label}</Link>}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Menu>
        {/* Fin */}
      </AppBar>
    </>
  );
}
