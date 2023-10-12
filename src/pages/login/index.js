import { Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/images/logo-vertical.png";
import { reducerSetLogin } from "../../redux/logins/loginSlice";
import api from "../../services/api";
import { login } from "../../services/auth";
import "./styles.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("farabello@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const dispatch = useDispatch()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      api
        .post(`/auth`, {
          login_email: email,
          login_password: password,
        })
        .then((res) => {
          login(res?.data?.access_token);

          dispatch(reducerSetLogin({
            ...res.data
          }))

          localStorage.setItem("login", JSON.stringify(res.data));

          toast.success("Login efetuado com sucesso");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Credenciais inválidas ou usuário inexistente");
        });
    }
  };

  function isFormValid() {
    setErrorEmail("");
    setErrorPassword("");

    let isValid = true;

    if (email === "") {
      setErrorEmail("Digite o email*");
      isValid = false;
    }
    if (password === "") {
      setErrorPassword("Digite a senha*");
      isValid = false;
    }

    return isValid;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="login-container">
        <div className="login-box">
          <img src={logo} alt="logo"></img>
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="email">E-mail</label>
              <Input value={email} onChange={handleEmailChange} />
              {errorEmail && <small className="error">{errorEmail}</small>}
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Senha</label>
              <Input.Password
                value={password}
                onChange={handlePasswordChange}
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
              />
              {errorPassword && (
                <small className="error">{errorPassword}</small>
              )}
            </div>
            <button type="submit">Entrar</button>
            <Link to={"/cadastro"}>
              <p style={{ color: "white" }}>Cadastrar conta</p>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
