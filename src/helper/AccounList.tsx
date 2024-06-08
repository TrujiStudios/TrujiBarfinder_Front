import TabletIcon from "@mui/icons-material/Tablet";
import ContactPageRoundedIcon from "@mui/icons-material/ContactPageRounded";
import RedeemTwoToneIcon from "@mui/icons-material/RedeemTwoTone";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";

export const accountList = [
  {
    label: "Mesas",
    icon: <TabletIcon sx={{ fontSize: 20 }} />,
    route: "/dashboard/tables"
  },
  {
    label: "My account",
    icon: <ContactPageRoundedIcon sx={{ fontSize: 20 }} />,
    route: "/dashboard/category"
  }
];

export const accountListProduct = [
  {
    label: "Categoria",
    icon: (
      <CategoryTwoToneIcon
        sx={{ fontSize: 20, marginLeft: 3, textDecoration: "none" }}
      />
    ),
    route: "/dashboard/category"
  },
  {
    label: "Productos",
    icon: <RedeemTwoToneIcon sx={{ fontSize: 20, marginLeft: 3 }} />,
    route: "/dashboard/product"
  }
];
