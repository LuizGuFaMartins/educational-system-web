import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import store from "./redux/store";
import routes from "./routes/routes";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
