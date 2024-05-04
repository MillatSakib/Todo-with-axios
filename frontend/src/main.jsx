import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import Solve from "./Solve/Solve.jsx";
import Complete from "./Complete/Complete.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Solve></Solve>,
      },
      {
        path: "/complete",
        element: <Complete></Complete>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
