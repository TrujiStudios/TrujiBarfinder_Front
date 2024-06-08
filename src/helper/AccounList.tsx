import TabletIcon from '@mui/icons-material/Tablet';
import ContactPageRoundedIcon from '@mui/icons-material/ContactPageRounded';

export const accountList = [
    { label: 'Mesas', icon: <TabletIcon sx={{ fontSize: 20 }} />, route: '/dashboard/tables' },
    { label: 'My account', icon: <ContactPageRoundedIcon sx={{ fontSize: 20 }} />, route: '/dashboard/category' },
];

export const accountListProduct = [
    { label: 'Categoria', icon: <TabletIcon sx={{ fontSize: 20, marginLeft: 3, textDecoration: "none" }} />, route: '/dashboard/category' },
    { label: 'Productos', icon: <ContactPageRoundedIcon sx={{ fontSize: 20, marginLeft: 3 }} />, route: '/dashboard/product' },
];