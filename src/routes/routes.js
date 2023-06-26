import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import CreateAccount from "../pages/createAccount";
import Login from "../pages/login";
import Profile from "../pages/profile";
import RegisterProduct from "../pages/registerProduct";
import ShoppingCart from "../pages/shoppingCart";
import Subject from "../pages/subjects";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/turmas", element: <Subject /> },
      { path: "/atividades", element: <RegisterProduct /> },
      { path: "/disciplinas", element: <Subject /> },
      { path: "/carrinho", element: <ShoppingCart /> },
      { path: "/perfil", element: <Profile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <CreateAccount />,
  },
]);

export default Routes;
