import {
  createBrowserRouter
  // RouterProvider,
} from "react-router-dom";
// import { Home } from "../components/Home";
import { Contact } from "../components/Contact";
// import AppBar from "../Nav";
// import SignUp from "../components/SignUp/SignUp";
// import SignIn from "../components/SignIn/SignIn";
// import BarManagement from "../components/ManagementSystem/appBarManagement/BarManagement";
import { Verder } from "../components/ManagementSystem/Verder";
import Products from "../components/ManagementSystem/products/Products";
import ProtectedRoute from "../ProtectedRoute";
import Category from "../components/ManagementSystem/category/Category";
import Table from "../components/ManagementSystem/tables/Table";
import Mesas from "../components/ManagementSystem/tables/Example";
import LandingPage from "../components/page/landing-page/LandingPage";
import SignIn from "../components/page/sign-in/SignIn";
import SignUp from "../components/page/sign-up/SignUp";
import { Dashboard } from "../components/ManagementSystem/Dashboard";
// import Dashboard from "../components/page/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <AppAppBar />,
    // element: <AppBar />,
    children: [
      {
        path: "",
        element: <LandingPage />
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
      {
        path: "tables",
        element: <Table />
      },
      {
        path: "tablesdos",
        element: <Mesas />
      }
    ]
  }
]);

export default router;
