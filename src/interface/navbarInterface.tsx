import { PaletteMode } from "@mui/material";

export interface NavBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}
