import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Container, PaletteMode } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ToggleColorMode from './ToggleColorMode';
import SideNav from './SideNav';
import MenuButton from './MenuButton';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import OptionsMenu from './OptionsMenu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, Outlet } from 'react-router-dom';
import { styles } from '../../../../themes/NavbarThemes';

interface NavBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const Toolbar = styled(MuiToolbar)({
  maxWidth: 1538,
  width: '100%',
  padding: '16px 16px 0 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  '& .MuiTabs-flexContainer': {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
});

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Navbar({ mode, toggleColorMode }: NavBarProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  // Estados para los menús desplegables
  const [anchorElAnalytics, setAnchorElAnalytics] = React.useState<null | HTMLElement>(null);
  const [anchorElClients, setAnchorElClients] = React.useState<null | HTMLElement>(null);
  const [anchorElProducts, setAnchorElProducts] = React.useState<null | HTMLElement>(null);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // Funciones para manejar la apertura y cierre de los menús desplegables
  const handleAnalyticsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAnalytics(event.currentTarget);
  };

  const handleClientsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElClients(event.currentTarget);
  };

  const handleProductsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProducts(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElAnalytics(null);
    setAnchorElClients(null);
    setAnchorElProducts(null);
  };

  return (
    <>

      <AppBar
        position="fixed"
        sx={(theme) => ({
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
        })}
      >
        <Toolbar variant="regular">
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            justifyContent={{ xs: 'flex-end', md: 'space-between' }}
            flexGrow={1}
            sx={{ width: '100%', display: { xs: 'none', md: 'flex' } }}
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
            sx={{ width: '100%', display: { sm: 'flex', md: 'none' } }}
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
            <Link style={styles.linkNavbar} to="/dashboard/tables">Mesas</Link>

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
          <MenuItem onClick={handleMenuClose}>
            <Link style={styles.linkNavbar} to="/dashboard/category">Categoria</Link>

          </MenuItem>
          {/* <MenuItem onClick={handleMenuClose}>Add New</MenuItem> */}
          <MenuItem onClick={handleMenuClose}>
            <Link style={styles.linkNavbar} to="/dashboard/product">
              Productos
            </Link>
          </MenuItem>
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
            <Link style={styles.linkNavbar} to="/dashboard/tables">Mesas</Link>

          </MenuItem>
          {/* <MenuItem onClick={handleMenuClose}>Add New</MenuItem> */}
          <MenuItem onClick={handleMenuClose}>
            <Link style={styles.linkNavbar} to="/dashboard/product">
              Mesa Uno
            </Link>
          </MenuItem>
        </Menu>

        {/* //Fin */}





      </AppBar>


    </>

  );
}
