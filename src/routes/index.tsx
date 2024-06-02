import {
  createBrowserRouter
  // RouterProvider,
} from "react-router-dom";
import { Home } from "../components/Home";
import { Contact } from "../components/Contact";
import AppBar from "../Nav";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";
import { Dashboard } from "../components/ManagementSystem/Dashboard";

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
      },
      {
        path: "dashboard",
        element: <Dashboard />
      }
    ]
  }
]);

export default router;
