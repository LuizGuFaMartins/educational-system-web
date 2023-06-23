import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./routes/routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <RouterProvider router={routes} />
    </ConfigProvider>
  </React.StrictMode>
);
