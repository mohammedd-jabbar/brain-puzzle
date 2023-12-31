import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Header from "./components/common/Header.jsx";
import Difficulty from "./pages/Difficulty.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";
import { isLoggedIn } from "./hooks/auth.js";
import Game from "./pages/Game.jsx";
import "./i18n.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <h1>404 sorry this page is not available</h1>,
    children: [
      {
        index: true,
        element: isLoggedIn() ? <Difficulty /> : <Login />,
        errorElement: <h1>404 sorry this page is not available</h1>,
      },
      {
        path: "difficulty/:gameDifficulty",
        element: isLoggedIn() ? <Game /> : <Navigate to="/" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
