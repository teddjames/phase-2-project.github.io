// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './components/App'
// import './index.css'
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import routes from "../src/routes";

// const router = createBrowserRouter(routes);

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(<RouterProvider router={router} />)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './index.css';
import { AuthProvider } from './components/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
     <App />
  </AuthProvider>
  
  </BrowserRouter>
);
