import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Solve from "./Solve/Solve.jsx";
import Complete from "./Complete/Complete.jsx";
import PrivateRoutes from "./PrivateRoutes/MainPrivateRoutes.jsx";
import AuthPrivateRoute from "./PrivateRoutes/AuthPrivateRoute.jsx";
import Register from "./Auth/Register.jsx";
import Login from "./Auth/Login.jsx";
import AuthProvider from "./AuthProvider.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoutes>
            <Solve></Solve>
          </PrivateRoutes>
        ),
      },
      {
        path: "/complete",
        element: (
          <PrivateRoutes>
            <Complete></Complete>
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthPrivateRoute>
            <Login></Login>
          </AuthPrivateRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthPrivateRoute>
            <Register></Register>
          </AuthPrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer></ToastContainer>
    </AuthProvider>
  </React.StrictMode>
);
