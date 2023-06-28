import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logo from "../../assets/images/logo-vertical.png";
import api from "../../services/api";
import { isAuthenticated } from "../../services/auth";
import "./styles.css";

const CreateTeacherAccount = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorBirthday, setErrorBirthday] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorSpecialization, setErrorSpecialization] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSpecializationChange = (event) => {
    setSpecialization(event.target.value);
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
        .post(`/teachers`, {
          teacher_name: name,
          teacher_birthday: birthday,
          teacher_phone_number: phone,
          teacher_specialization: specialization,
          login_email: email,
          login_password: password,
        })
        .then((res) => {
          toast.success("Usuário cadastrado com sucesso");
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          if (error?.response?.status === 409) {
            toast.error("Já existe um usuário com este e-mail");
          } else {
            toast.error("Não foi possível criar o usuário");
          }
        });
    }
  };

  function isFormValid() {
    setErrorName("");
    setErrorBirthday("");
    setErrorPhone("");
    setErrorSpecialization("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirmPassword("");

    let isValid = true;

    if (name === "") {
      setErrorName("Digite o nome*");
      isValid = false;
    }

    if (birthday === "") {
      setErrorBirthday("Digite o aniversário*");
      isValid = false;
    }

    if (phone === "") {
      setErrorPhone("Digite o telefone*");
      isValid = false;
    }

    if (specialization === "") {
      setErrorSpecialization("Digite o telefone*");
      isValid = false;
    }

    if (email === "") {
      setErrorEmail("Digite o email*");
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
      <div className="create-teacher-account-container">
        <div className="create-account-box">
          <img src={logo} alt="logo"></img>
          <form onSubmit={handleSubmit}>
            <div className="create-teacher-account-form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
              {errorName && <small className="error">{errorName}</small>}
            </div>
            <div className="create-teacher-account-form-group">
              <label htmlFor="birthday">Aniversário:</label>
              <input
                type="date"
                id="birthday"
                value={birthday}
                onChange={handleBirthdayChange}
              />
              {errorBirthday && (
                <small className="error">{errorBirthday}</small>
              )}
            </div>
            <div className="create-teacher-account-form-group">
              <label htmlFor="phone">Telefone:</label>
              <input
                type="text"
                id="phone"
                mask="(00) 00000-0000"
                value={phone}
                onChange={handlePhoneChange}
              />
              {errorPhone && <small className="error">{errorPhone}</small>}
            </div>
            <div className="create-teacher-account-form-group">
              <label htmlFor="phone">Especialização:</label>
              <input
                type="text"
                id="specialization"
                mask="(00) 00000-0000"
                value={specialization}
                onChange={handleSpecializationChange}
              />
              {errorSpecialization && (
                <small className="error">{errorSpecialization}</small>
              )}
            </div>
            <div className="create-teacher-account-form-group">
              <label htmlFor="email">E-mail:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
              {errorEmail && <small className="error">{errorEmail}</small>}
            </div>
            <div className="create-teacher-account-form-group">
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              {errorPassword && (
                <small className="error">{errorPassword}</small>
              )}
            </div>
            <div className="create-teacher-account-form-group">
              <label htmlFor="confirmPassword">Confirmar senha:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
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

export default CreateTeacherAccount;
