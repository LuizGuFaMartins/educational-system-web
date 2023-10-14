import { Input, Select } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../services/api";
import { isAuthenticated } from "../../services/auth";
import "./styles.css";

const CreateActivity = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [init, setInit] = useState("");
  const [end, setEnd] = useState("");
  const [subject, setSubject] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorInit, setErrorInit] = useState("");
  const [errorEnd, setErrorEnd] = useState("");
  const [errorSubject, setErrorSubject] = useState("");

  const teacher = useSelector(state => state.teacher)
  const [subjectsList, setSubjectsList] = useState([]);

  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }

    api
      .get(`/subjects?where={\"teacher_id\": ${teacher.teacher_id}}`)
      .then((res) => {
        const subjects = res.data.map(r => {
          return {
            value: r.subject_id, label: r.subject_name
          }
        })
        setSubjectsList(subjects);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Não foi possível buscar as disciplinas");
      });
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleInitChange = (event) => {
    setInit(event.target.value);
  };

  const handleEndChange = (event) => {
    setEnd(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      api
        .post(`/activities`, {
          activity_name: name,
          activity_init: init,
          activity_end: end,
          subject_id: subject
        })
        .then((res) => {
          toast.success("Atividade cadastrada com sucesso");
          cleanFormFields();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Não foi possível cadastrar a atividade");
        });
    }
  };

  function cleanFormFields() {
    setName("");
    setInit("");
    setEnd("");
    setSubject("");
  }

  function isFormValid() {
    setErrorName("");
    setErrorInit("");
    setErrorEnd("");
    setErrorSubject("");

    let isValid = true;

    if (name === "") {
      setErrorName("Digite o nome*");
      isValid = false;
    }

    if (init === "") {
      setErrorInit("Digite a data de inicio*");
      isValid = false;
    }

    if (end === "") {
      setErrorEnd("Digite a data de fim*");
      isValid = false;
    }

    if (subject === "") {
      setErrorSubject("Selecione a disciplina*");
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
              <label htmlFor="init">Inicio</label>
              <input
                type="date"
                id="init"
                value={init}
                onChange={handleInitChange}
              />
              {errorInit && <small className="error">{errorInit}</small>}
            </div>
            <div className="create-user-form-group">
              <label htmlFor="end">Fim:</label>
              <input
                type="date"
                id="end"
                value={end}
                onChange={handleEndChange}
              />
              {errorEnd && (
                <small className="error">{errorEnd}</small>
              )}
            </div>
            <div className="create-user-form-group">
              <label htmlFor="subject">Disciplina</label>
              <Select
                style={{ color: "gray" }}
                defaultValue="STUDENT"
                value={subject}
                onChange={handleSubjectChange}
                options={subjectsList}
              />
              {errorSubject && <small className="error">{errorSubject}</small>}
            </div>
            <button subject="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateActivity;
