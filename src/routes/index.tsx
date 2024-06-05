import {
  createBrowserRouter
  // RouterProvider,
} from "react-router-dom";
import { Home } from "../components/Home";
import { Contact } from "../components/Contact";
import AppBar from "../Nav";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";
// import { Dashboard } from "../components/ManagementSystem/Dashboard";
// import BarManagement from "../components/ManagementSystem/appBarManagement/BarManagement";
import { Verder } from "../components/ManagementSystem/Verder";
import Products from "../components/ManagementSystem/products/Products";
import ProtectedRoute from "../ProtectedRoute";
import { Dashboard } from "../components/ManagementSystem/Dashboard";
import Category from "../components/ManagementSystem/category/Category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppBar />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "SignIn",
        element: <SignIn />
      },
      {
        path: "SignUp",
        element: <SignUp />
      },
      {
        path: "contact",
        element: <Contact />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />, // Management nav for authenticated users
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "vender",
        element: <Verder />
      },
      {
        path: "product",
        element: <Products />
      },
      {
        path: "category",
        element: <Category />
      },

    ]
  }
]);

export default router;
