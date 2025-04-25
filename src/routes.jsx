import App from "./components/App";
import Homepage from "./components/Homepage";
import Inventory from "./components/Inventory";
import AboutUs from "./components/AboutUs";
import Garage from "./components/Garage";
import Login from "./components/LoginLogout";

const routes = [
    {
        path: "/",
        element: <App />
    },
    {
        path: "/",
        element: <Homepage />
    },
    {
        path: "/inventory",
        element: <Inventory />
    },
    {
        path: "/garage",
        element: <Garage />
    },
    {
        path: "/about",
        element: <AboutUs />
    },
    {
        path: "/login",
        element: <Login />
    },

];

export default routes;