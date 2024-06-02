import {
  createBrowserRouter
  // RouterProvider,
} from "react-router-dom";
import { Home } from "../components/Home";
import { Contact } from "../components/Contact";
import AppBar from "../Nav";
import SignUp from "../components/SignUp/SignUp";
import LoginForm from "../components/SignIn/SignIn";

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
        element: <LoginForm />
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
  }
]);

export default router;
