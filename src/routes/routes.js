import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import CreateAccount from "../pages/createAccount";
import Login from "../pages/login";
import Product from "../pages/products";
import RegisterProduct from "../pages/registerProduct";
import ShoppingCart from "../pages/shoppingCart";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/turmas", element: <Product /> },
      { path: "/atividades", element: <RegisterProduct /> },
      { path: "/disciplinas", element: <RegisterProduct /> },
      { path: "/carrinho", element: <ShoppingCart /> },
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
