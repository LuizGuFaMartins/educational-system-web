import {
  CiCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  PaperClipOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import logo from "./assets/images/logo-horizontal.png";
import logoIcon from "./assets/images/logo-icon.png";
import { isAuthenticated, logout } from "./services/auth";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      navigate("/disciplinas");
    }
  }, []);

  return (
    <Layout className="layout-container">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#4d4d4d",
        }}
      >
        <div className="demo-logo-vertical">
          {collapsed ? (
            <img
              style={{ width: "50px", height: "45px" }}
              src={logoIcon}
              alt="logo"
            ></img>
          ) : (
            <img style={{ width: "90%" }} src={logo} alt="logo"></img>
          )}
        </div>
        <Menu
          style={{
            background: "#4d4d4d",
            color: "#FFFFFF",
          }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <ShopOutlined />,
              label: "Disciplinas",
              onClick: () => navigate("/disciplinas"),
            },
            {
              key: "2",
              icon: <PaperClipOutlined />,
              label: "Atividades",
              onClick: () => navigate("/atividades"),
            },
            {
              key: "3",
              icon: <ShopOutlined />,
              label: "Turmas",
              onClick: () => navigate("/turmas"),
            },
            {
              key: "4",
              icon: <PlusCircleOutlined />,
              label: "Cadastrar",
              onClick: () => navigate("/atividades"),
            },
            {
              key: "5",
              icon: <ShoppingCartOutlined />,
              label: "Carrinho",
              onClick: () => navigate("/carrinho"),
            },
            {
              key: "6",
              icon: <UserOutlined />,
              label: "Perfil",
              onClick: () => navigate("/perfil"),
            },
            {
              key: "7",
              icon: <CiCircleOutlined />,
              label: "Sair",
              onClick: () => {
                logout();
                navigate("/login");
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#637566",
            display: "flex",
            alignContent: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "white",
            }}
          />
          <div className="header-label">
            <h2>
              {location.pathname.includes("/turmas")
                ? "Turmas"
                : location.pathname.includes("/atividades")
                ? "Atividades"
                : location.pathname.includes("/disciplinas")
                ? "Disciplinas"
                : location.pathname.includes("/carrinho")
                ? "Carrinho"
                : ""}
            </h2>
          </div>
        </Header>
        <Content
          style={{
            maxHeight: "100%",
            padding: "2.5rem",
            minHeight: 280,
            background: "white",
            overflow: "auto",
            position: "relative",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
