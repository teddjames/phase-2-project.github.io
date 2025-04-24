import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import Homepage from "./components/Homepage";
import Inventory from "./components/Inventory";
import AboutUs from "./components/AboutUs";

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
        path: "/about",
        element: <AboutUs />
    }
];

export default routes;