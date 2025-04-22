import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "../src/routes";

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)