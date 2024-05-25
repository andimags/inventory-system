import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import GuestLayout from "./components/layouts/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Products from "./views/Products";

const router = createBrowserRouter([
    {
        path: "",
        element: <GuestLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
    {
        path: "",
        element: <AuthLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "products",
                element: <Products />,
            },
        ],
    },
]);

export default router;
