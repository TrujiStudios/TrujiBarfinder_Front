import { styled } from "@mui/material/styles";
import MuiToolbar from "@mui/material/Toolbar";

// eslint-disable-next-line react-refresh/only-export-components
export const styles = {
  linkNavbar: {
    textDecoration: "none",
    color: "inherit"
  }
};

export const Toolbar = styled(MuiToolbar)({
  maxWidth: 1538,
  width: "100%",
  padding: "16px 16px 0 16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  gap: "12px",
  flexShrink: 0,
  backdropFilter: "blur(24px)",
  "& .MuiTabs-flexContainer": {
    gap: "8px",
    p: "8px",
    pb: 0
  }
});
