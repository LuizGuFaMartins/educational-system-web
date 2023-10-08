import { Input, Select } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../services/api";
import { getLoginObject, isAuthenticated } from "../../services/auth";
import "./styles.css";

const CreateUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorBirthday, setErrorBirthday] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorType, setErrorType] = useState("");
  const [errorSpecialization, setErrorSpecialization] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event);
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
        .post(`/create-auth`, {
          login_name: name,
          login_type: type,
          login_email: email,
          login_password: password,
          created_by: getLoginObject().login_id,
        })
        .then((res) => {
          if (res?.data?.login_type === "STUDENT") {
            api
              .post(`/students`, {
                student_name: name,
                student_birthday: birthday,
                student_phone_number: phone,
                login_id: res.data.login_id,
              })
              .then((res) => {
                toast.success("Usuário cadastrado com sucesso");
                cleanFormFields();
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
          if (res?.data?.login_type === "TEACHER") {
            api
              .post(`/teachers`, {
                teacher_name: name,
                teacher_birthday: birthday,
                teacher_phone_number: phone,
                teacher_specialization: specialization,
                login_id: res.data.login_id,
              })
              .then((res) => {
                toast.success("Usuário cadastrado com sucesso");
                cleanFormFields();
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

  function cleanFormFields() {
    setName("");
    setEmail("");
    setBirthday("");
    setPhone("");
    setType("");
    setSpecialization("");
    setPassword("");
    setConfirmPassword("");
  }

  function isFormValid() {
    setErrorName("");
    setErrorEmail("");
    setErrorBirthday("");
    setErrorPhone("");
    setErrorType("");
    setErrorSpecialization("");
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

    if (type === "TEACHER" && specialization === "") {
      setErrorType("Digite a especialização*");
      isValid = false;
    }

    if (password === "") {
      setErrorPassword("Digite a senha*");
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
      <div className="create-user-container">
        <div className="create-user-box">
          <form onSubmit={handleSubmit}>
            <div className="create-user-form-group">
              <label htmlFor="name">Nome</label>
              <Input value={name} onChange={handleNameChange} />
              {errorName && <small className="error">{errorName}</small>}
            </div>
            <div className="create-user-form-group">
              <label htmlFor="email">E-mail</label>
              <Input value={email} onChange={handleEmailChange} />
              {errorEmail && <small className="error">{errorEmail}</small>}
            </div>
            <div className="create-user-form-group">
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
            <div className="create-user-form-group">
              <label htmlFor="phone">Telefone:</label>
              <Input
                mask="(00) 00000-0000"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="create-user-form-group">
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
            </div>
            {type === "TEACHER" && (
              <div className="create-user-form-group">
                <label htmlFor="specialization">Especialização:</label>
                <Input
                  value={specialization}
                  onChange={handleSpecializationChange}
                />
                {errorSpecialization && (
                  <small className="error">{errorSpecialization}</small>
                )}
              </div>
            )}
            <div className="create-user-form-group">
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
            <div className="create-user-form-group">
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
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
