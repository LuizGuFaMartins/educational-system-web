import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Login from "../pages/login";
import Product from "../pages/products";
import RegisterProduct from "../pages/registerProduct";
import ShoppingCart from "../pages/shoppingCart";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/produtos", element: <Product /> },
      { path: "/cadastro", element: <RegisterProduct /> },
      { path: "/carrinho", element: <ShoppingCart /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default Routes;
