import {
  createBrowserRouter
  // RouterProvider,
} from "react-router-dom";
import { Home } from "../components/Home";
import { Contact } from "../components/Contact";
import AppBar from "../Nav";
// import { SignIn } from "../components/SignIn/SignIn";
// import { SignUp } from "../components/SignUp/SignUp";
import RegistroForm from "../components/SignUp/RegistroForm";
import LoginForm from "../components/SignIn/LoginForm";

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
        element: <RegistroForm />
      },
      {
        path: "contact",
        element: <Contact />
      }
    ]
  }
]);

export default router;
