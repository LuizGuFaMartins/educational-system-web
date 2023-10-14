import { Input, Select } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import uuid from "react-uuid";
import api from "../../services/api";
import { isAuthenticated } from "../../services/auth";
import "./styles.css";

const CreateSubject = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [workload, setWorkload] = useState("");
  const [teacher, setTeacher] = useState("");
  const [course, setCourse] = useState("");

  const [errorCode, setErrorCode] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorWorkload, setErrorWorload] = useState("");
  const [errorTeacher, setErrorTeacher] = useState("");
  const [errorCourse, setErrorCourse] = useState("");

  const [teachersList, setTeachersList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);

  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }

    setCode(uuid().split("-")[0]);

    api
      .get(`/teachers`)
      .then((res) => {
        if (res) {
          const teachers = res.data.map(r => {
            return {
              value: r.teacher_id, label: r.teacher_name
            }
          })
          setTeachersList(teachers);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Não foi possível buscar os professores");
      });

    api
      .get(`/courses`)
      .then((res) => {
        if (res) {
          const courses = res.data.map(r => {
            return {
              value: r.course_id, label: r.course_name
            }
          })
          setCoursesList(courses);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Não foi possível buscar os cursos");
      });
  }, []);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleWorkloadChange = (event) => {
    setWorkload(event.target.value);
  };

  const handleTeacherChange = (event) => {
    setTeacher(event);
  };

  const handleCourseChange = (event) => {
    setCourse(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      api
        .post(`/subjects`, {
          subject_code: code,
          subject_name: name,
          subject_workload: workload,
          teacher_id: teacher,
          course_id: course,
        })
        .then((res) => {
          toast.success("Disciplina cadastrada com sucesso");
          cleanFormFields();
        })
        .catch((error) => {
          console.log(error);
          toast.error("Não foi possível cadastrar a disciplina");
        });
    }
  };

  function cleanFormFields() {
    setCode("");
    setName("");
    setWorkload("");
    setTeacher("");
    setCourse("");
  }

  function isFormValid() {
    setErrorCode("");
    setErrorName("");
    setErrorWorload("");
    setErrorTeacher("");
    setErrorCourse("");

    let isValid = true;

    if (code === "") {
      setErrorCode("Digite o código*");
      isValid = false;
    }

    if (name === "") {
      setErrorName("Digite o nome*");
      isValid = false;
    }

    if (workload === "") {
      setErrorWorload("Digite a carga horária*");
      isValid = false;
    }

    if (teacher === "") {
      setErrorTeacher("Selecione o professor*");
      isValid = false;
    }

    if (course === "") {
      setErrorCourse("Selecione o curso*");
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
              <label htmlFor="code">Código</label>
              <Input disabled value={code} onChange={handleCodeChange} />
              {errorCode && <small className="error">{errorCode}</small>}
            </div>
            <div className="create-user-form-group">
              <label htmlFor="name">Nome</label>
              <Input value={name} onChange={handleNameChange} />
              {errorName && <small className="error">{errorName}</small>}
            </div>
            <div className="create-user-form-group">
              <label htmlFor="workload">Carga horária</label>
              <Input value={workload} onChange={handleWorkloadChange} />
              {errorWorkload && <small className="error">{errorWorkload}</small>}
            </div>
            <div className="create-user-form-group">
              <label htmlFor="teacher">Professor</label>
              <Select
                style={{ color: "gray" }}
                defaultValue="STUDENT"
                value={teacher}
                onChange={handleTeacherChange}
                options={teachersList}
              />
              {errorTeacher && <small className="error">{errorTeacher}</small>}
            </div>
            <div className="create-user-form-group">
              <label htmlFor="course">Curso</label>
              <Select
                style={{ color: "gray" }}
                defaultValue="STUDENT"
                value={course}
                onChange={handleCourseChange}
                options={coursesList}
              />
              {errorCourse && <small className="error">{errorCourse}</small>}
            </div>

            <button course="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateSubject;
