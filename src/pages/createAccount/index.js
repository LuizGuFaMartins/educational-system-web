import { Input, Select } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/images/logo-vertical.png";
import api from "../../services/api";
import { isAuthenticated } from "../../services/auth";
import "./styles.css";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("ADMIN");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorType, setErrorType] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      api
        .post(`/create-auth`, {
          login_name: name,
          login_type: "ADMIN",
          login_email: email,
          login_password: password,
        })
        .then((res) => {
          toast.success("Usuário cadastrado com sucesso");

          // api
          //   .post(`/students`, {
          //     login_name: name,
          //     login_type: type,
          //     login_email: email,
          //     login_password: password,
          //   })
          //   .then((res) => {
          //     toast.success("Usuário cadastrado com sucesso");

          //     navigate("/login");
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //     if (error?.response?.status === 409) {
          //       toast.error("Já existe um usuário com este e-mail");
          //     } else {
          //       toast.error("Não foi possível cadastrar o usuário");
          //     }
          //   });

          // api
          //   .post(`/teachers`, {
          //     login_name: name,
          //     login_type: type,
          //     login_email: email,
          //     login_password: password,
          //   })
          //   .then((res) => {
          //     toast.success("Usuário cadastrado com sucesso");

          //     navigate("/login");
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //     if (error?.response?.status === 409) {
          //       toast.error("Já existe um usuário com este e-mail");
          //     } else {
          //       toast.error("Não foi possível cadastrar o usuário");
          //     }
          //   });

          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          if (error?.response?.status === 409) {
            toast.error("Já existe um usuário com este e-mail");
          } else {
            toast.error("Não foi possível cadastrar o usuário");
          }
        });
    }
  };

  function isFormValid() {
    setErrorName("");
    setErrorEmail("");
    setErrorType("");
    setErrorPassword("");
    setErrorConfirmPassword("");

    let isValid = true;

    if (name === "") {
      setErrorName("Digite o nome*");
      isValid = false;
    }

    if (email === "") {
      setErrorEmail("Digite o email*");
      isValid = false;
    }

    if (type === "") {
      setErrorType("Selecione o tipo da conta*");
      isValid = false;
    }

    if (password === "") {
      setErrorPassword("Digite a senha*");
      isValid = false;
    }

    if (confirmPassword === "") {
      setErrorConfirmPassword("Digite a confirmação de senha*");
      isValid = false;
    } else if (confirmPassword !== password) {
      setErrorConfirmPassword("As senha devem ser iguais*");
      isValid = false;
    }

    return isValid;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="create-account-container">
        <div className="create-account-box">
          <img src={logo} alt="logo"></img>
          <form onSubmit={handleSubmit}>
            <div className="create-account-form-group">
              <label htmlFor="name">Nome</label>
              <Input value={name} onChange={handleNameChange} />
              {errorName && <small className="error">{errorName}</small>}
            </div>
            <div className="create-account-form-group">
              <label htmlFor="email">E-mail</label>
              <Input value={email} onChange={handleEmailChange} />
              {errorEmail && <small className="error">{errorEmail}</small>}
            </div>
            {/* <div className="create-account-form-group">
              <label htmlFor="type">Tipo da conta</label>
              <Select
                style={{ color: "gray" }}
                defaultValue="STUDENT"
                value={type}
                onChange={handleTypeChange}
                options={[
                  { value: "TEACHER", label: "Professor" },
                  { value: "STUDENT", label: "Estudante" },
                ]}
              />
              {errorType && <small className="error">{errorType}</small>}
            </div> */}
            <div className="create-account-form-group">
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
            <div className="create-account-form-group">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <Input.Password
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                visibilityToggle={{
                  visible: confirmPasswordVisible,
                  onVisibleChange: setConfirmPasswordVisible,
                }}
              />
              {errorConfirmPassword && (
                <small className="error">{errorConfirmPassword}</small>
              )}
            </div>
            <button type="submit">Cadastrar</button>
            <Link to={"/login"}>
              <p style={{ color: "white" }}>Fazer login</p>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
