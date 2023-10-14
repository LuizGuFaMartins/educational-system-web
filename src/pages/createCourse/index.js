import { Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../services/api";
import { isAuthenticated } from "../../services/auth";
import "./styles.css";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workload, setWorkload] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorWorkload, setErrorWorkload] = useState("");

  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleWorkloadChange = (event) => {
    setWorkload(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      api
        .post(`/courses`, {
          course_name: name,
          course_description: description,
          course_workload: workload,
        })
        .then((res) => {
          toast.success("Curson cadastrado com sucesso");
          cleanFormFields();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Não foi possível cadastrar o curso");
        });
    }
  };

  function cleanFormFields() {
    setName("");
    setDescription("");
    setWorkload("");
  }

  function isFormValid() {
    setErrorName("");
    setErrorDescription("");
    setErrorWorkload("");

    let isValid = true;

    if (name === "") {
      setErrorName("Digite o nome*");
      isValid = false;
    }

    if (description === "") {
      setErrorDescription("Digite a descrição*");
      isValid = false;
    }

    if (workload === "") {
      setErrorWorkload("Digite a carga horária*");
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
              <label htmlFor="description">Descrição</label>
              <Input.TextArea style={{minHeight: 200, border: '1px solid var(--primary-color-2)'}} value={description} onChange={handleDescriptionChange} />
              {errorDescription && <small className="error">{errorDescription}</small>}
            </div>
            <div className="create-user-form-group">
              <label htmlFor="workload">Carga horária:</label>
              <Input
                value={workload}
                onChange={handleWorkloadChange}
              />
              {errorWorkload && (
                <small className="error">{errorWorkload}</small>
              )}
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
