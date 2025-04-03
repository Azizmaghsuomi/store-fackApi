import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root/Root.jsx";
import Login from "../pages/Login/Login.jsx";
import Signup from "../pages/Signup/Signup.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Categories from "../pages/Categories/Categories.jsx";
import Products from "../pages/Products/Products.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/categories/:id",
    element: <Categories />,
  },
  {
    path: "/products/:id",
    element: <Products />,
  },
]);

export default router;
