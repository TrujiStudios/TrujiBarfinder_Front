import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Menu as MenuIcon } from '@mui/icons-material';

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'lightgreen' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Barfinder360
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button color="inherit">Dashboard</Button>
                    <Button color="inherit">Vender</Button>
                    <Button
                        color="inherit"
                        onClick={handleMenu}
                        endIcon={<MenuIcon />}
                    >
                        Productos
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Categorías</MenuItem>
                        <MenuItem onClick={handleClose}>Productos</MenuItem>
                        <MenuItem onClick={handleClose}>Promociones</MenuItem>
                        <MenuItem onClick={handleClose}>Inventario</MenuItem>
                    </Menu>
                    <Button color="inherit">Configuración</Button>
                    <Button color="inherit">Dropdown</Button>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                        <MenuItem onClick={handleClose}>Vender</MenuItem>
                        <MenuItem onClick={handleClose}>Productos</MenuItem>
                        <MenuItem onClick={handleClose}>Configuración</MenuItem>
                        <MenuItem onClick={handleClose}>Dropdown</MenuItem>
                    </Menu>
                </Box>
                <Button color="inherit" sx={{ marginLeft: 'auto' }}>Cerrar sesión</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
