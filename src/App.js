import {
  CiCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PaperClipOutlined,
  PlusCircleOutlined,
  ShopOutlined,
  UserOutlined,
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
  const [routes, setRoutes] = React.useState([]);

  const adminRoutes = [
    // {
    //   key: "1",
    //   icon: <ShopOutlined />,
    //   label: "Usuários",
    //   onClick: () => navigate("/usuarios"),
    // },
    {
      key: "1",
      icon: <PlusCircleOutlined />,
      label: "Cadastrar usuário",
      onClick: () => navigate("/novo-usuario"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Perfil",
      onClick: () => navigate("/perfil"),
    },
    {
      key: "3",
      icon: <CiCircleOutlined />,
      label: "Sair",
      onClick: () => {
        logout();
        navigate("/login");
      },
    },
  ];

  const teacherRoutes = [
    {
      key: "1",
      icon: <ShopOutlined />,
      label: "Turmas",
      onClick: () => navigate("/turmas"),
    },
    {
      key: "2",
      icon: <PlusCircleOutlined />,
      label: "Cadastrar atividade",
      onClick: () => navigate("/atividades"),
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: "Perfil",
      onClick: () => navigate("/perfil"),
    },
    {
      key: "4",
      icon: <CiCircleOutlined />,
      label: "Sair",
      onClick: () => {
        logout();
        navigate("/login");
      },
    },
  ];

  const studentRoutes = [
    // {
    //   key: "1",
    //   icon: <ShopOutlined />,
    //   label: "Cursos",
    //   onClick: () => navigate("/cursos"),
    // },
    {
      key: "1",
      icon: <ShopOutlined />,
      label: "Disciplinas",
      onClick: () => navigate("/disciplinas"),
    },
    {
      key: "2",
      icon: <ShopOutlined />,
      label: "Matriculas",
      onClick: () => navigate("/matriculas"),
    },
    {
      key: "3",
      icon: <PaperClipOutlined />,
      label: "Atividades",
      onClick: () => navigate("/atividades"),
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: "Perfil",
      onClick: () => navigate("/perfil"),
    },
    {
      key: "5",
      icon: <CiCircleOutlined />,
      label: "Sair",
      onClick: () => {
        logout();
        navigate("/login");
      },
    },
  ];

  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      let login = JSON.parse(localStorage.getItem("login"));
      if (login?.login_type === "ADMIN") {
        setRoutes(adminRoutes);
      }
      if (login?.login_type === "STUDENT") {
        setRoutes(studentRoutes);
      }
      if (login?.login_type === "TEACHER") {
        setRoutes(teacherRoutes);
      }
    }
  }, []);

  React.useEffect(() => {
    routes[0]?.onClick();
  }, [routes]);

  return (
    <Layout className="layout-container">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background:
            "linear-gradient(to bottom, var(--primary-color-2) 70%, var(--primary-color-3))",
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
            background: "transparent",
            color: "#FFFFFF",
          }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={routes}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background:
              "linear-gradient(to right, var(--primary-color-2) 70%, var(--primary-color-3))",
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
