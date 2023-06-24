import React, { useState } from "react";
import logo from "../../assets/images/logo-vertical.png";
import "./styles.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realizar a validação dos dados inseridos
    if (username === "admin" && password === "password") {
      setError("");
      // Lógica para lidar com o login bem-sucedido
      console.log("Login bem-sucedido!");
    } else {
      setError("Nome de usuário ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="logo"></img>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="username">Nome de usuário:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Entrar</button>
          {/* {error && <p>{error}</p>} */}
        </form>
      </div>
    </div>
  );
};

export default Login;
