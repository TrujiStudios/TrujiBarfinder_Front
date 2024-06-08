import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MenuButton from "./MenuButton";
import axios from "axios";
import { Link } from "react-router-dom";

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.post(
      "http://localhost:5000/api/v1/auth/logout",
      {},
      { withCredentials: true }
    );
    // logout();
  };
  return (
    <React.Fragment>
      <MenuButton onClick={handleClick}>
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{ mt: 1 }}>
          <Avatar
            sizes="small"
            alt="Riley Carter"
            src="/static/images/avatar/7.jpg"
            sx={{
              width: 24,
              height: 24,
              mr: 1
            }}
          />
          <Typography component="p" variant="subtitle2">
            Riley Carter Si
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Add another account</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography
            component="p"
            variant="subtitle2"
            sx={{
              color: "error.main"
            }}
          >
            {/* Logout */}
            <Link
              style={{ textDecoration: "none", color: "#DC3545" }}
              to="/signIn"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
