import { Modal } from "antd";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { logout } from "../../services/auth";
import "./styles.css";

const SubjectCard = ({ subject, student, setDeleteId }) => {
  const navigate = useNavigate();
  const login = useSelector(state => state.login)

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    api
      .post(`/subjects/subscribe`, {
        subject_id: subject.subject_id,
        student_id: student.student_id,
      })
      .then((res) => {
        toast.success("Matrícula realizada com sucesso");
      })
      .catch((error) => {
        console.log(error);
        if (error?.response && error.response.status === 401) {
          navigate("/login");
          logout();
        }
        if (error?.response && error.response.status === 409) {
          toast.warning("Você já está matriculado nessa disciplina");
        } else {
          toast.error("Não foi possível realizar a matrícula com sucesso");
        }
      });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card-body">
        <div className="form-group">
          <label>Código da disciplina:</label>
          <span>{subject?.subject_code}</span>
        </div>
        <div className="form-group">
          <label>Nome da disciplina:</label>
          <span>{subject?.subject_name}</span>
        </div>
        {login.login_type === "STUDENT" &&
          <div className="form-group">
            <label>Professor:</label>
            <span>{subject?.teacher.teacher_name}</span>
          </div>
        }
        <div className="buttons-box">
        {login.login_type === "STUDENT" &&
          <button
            type="primary"
            onClick={showModal}
            className="btn-subject-card"
          >
            Fazer matrícula
          </button>}
          <Modal
            title={null}
            open={isModalOpen}
            footer={null}
            className="product-modal"
            onOk={handleOk}
            onCancel={handleCancel}
            bodyStyle={{
              width: "100%",
              borderRadius: 35,
              textAlign: "center",
              padding: 0,
            }}
          >
            <p className="modal-text">
              Tem certeza que deseja realizar a matrícula na disciplina?
            </p>
            <div style={{ marginTop: 20 }} className="buttons-box">
              <button onClick={handleCancel}>Voltar</button>
              <button onClick={handleOk}>Realizar matrícula</button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default SubjectCard;
