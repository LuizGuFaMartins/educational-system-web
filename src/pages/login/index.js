import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-vertical.png";
import api from "../../services/api";
import { login } from "../../services/auth";
import "./styles.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

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
        .post(`/login`, {
          loginEmail: email,
          loginPassword: password,
        })
        .then((res) => {
          login(res.data.accessToken);
          navigate("/");
        })
        .catch((error) => console.log(error));
    }
  };

  function isFormValid() {
    setErrorEmail("");
    setErrorPassword("");

    if (email === "") {
      setErrorEmail("E-mail inválido");
    }
    if (password === "") {
      setErrorPassword("Senha inválida");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="logo"></img>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">Nome de usuário:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            {errorEmail && <small className="error">{errorEmail}</small>}
          </div>
          <div className="login-form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {errorPassword && <small className="error">{errorPassword}</small>}
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
