
import * as React from 'react';



export const NavbarHoook = () => {

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);

    // Estados para los menús desplegables
    const [anchorElAnalytics, setAnchorElAnalytics] = React.useState<null | HTMLElement>(null);
    const [anchorElClients, setAnchorElClients] = React.useState<null | HTMLElement>(null);
    const [anchorElProducts, setAnchorElProducts] = React.useState<null | HTMLElement>(null);
    const [anchorElExample, setAnchorElExample] = React.useState<null | HTMLElement>(null);

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

    const handleExampleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElExample(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorElAnalytics(null);
        setAnchorElClients(null);
        setAnchorElProducts(null);
        setAnchorElExample(null);
    };

    return {
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
    }

}
