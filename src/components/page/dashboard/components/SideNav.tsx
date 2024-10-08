import * as React from "react";
import { PaletteMode } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import axios from "axios";

import MenuButton from "./MenuButton";
import ToggleColorMode from "./ToggleColorMode";
import { Link } from "react-router-dom";

interface SideNavProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const accountsList = [
  { label: "Perfil", icon: <AccountCircleRoundedIcon sx={{ fontSize: 20 }} /> },
  {
    label: "My account",
    icon: <ContactPageRoundedIcon sx={{ fontSize: 20 }} />
  }
];

const settingsList = [
  { label: "Add account", icon: <AddRoundedIcon sx={{ fontSize: 20 }} /> },
  {
    label: "Configuración",
    icon: <SettingsRoundedIcon sx={{ fontSize: 20 }} />
  }
];

export default function SideNav({
  open,
  toggleDrawer,
  mode,
  toggleColorMode
}: SideNavProps) {
  const handleLogout = () => {
    axios.post(
      "http://localhost:5000/api/v1/auth/logout",
      {},
      { withCredentials: true }
    );
    // logout();
  };
  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Stack
        gap={2}
        sx={{
          minWidth: "80dvw",
          p: 3,
          backgroundColor: "background.paper",
          flexGrow: 1
        }}
      >
        <Stack direction="row" gap={1}>
          <Stack direction="row" gap={1} alignItems="center" flexGrow={1}>
            <Avatar
              sizes="small"
              alt="Riley Carter"
              src="/static/images/avatar/7.jpg"
              sx={{
                width: 24,
                height: 24
              }}
            />
            <Typography component="p" variant="h6">
              Riley Carter (Admin)
            </Typography>
          </Stack>
          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        </Stack>
        <Stack gap={2}>
          <Divider />
          <List>
            {accountsList.map((item, index) => (
              <ListItem key={index}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}

            {settingsList.map((item, index) => (
              <ListItem key={index}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
          >
            Logout
            <Link
              style={{ textDecoration: "none", color: "#DC3545" }}
              to="/signIn"
              onClick={handleLogout}
            ></Link>
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
