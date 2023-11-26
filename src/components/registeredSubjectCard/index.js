import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import api from "../../services/api";
import { logout } from "../../services/auth";
import "./styles.css";

const RegisteredSubjectCard = ({ subject, student, setDeleteId }) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function onDelete() {
    api
      .post(`/subjects/cancel`, {
        subject_id: subject.subject_id,
        student_id: student.student_id,
      })
      .then((res) => {
        toast.success("Matrícula cancelada com sucesso");
      })
      .catch((error) => {
        console.log(error);
        if (error?.response && error.response.status === 401) {
          navigate("/login");
          logout();
        }
        toast.error("Não foi possível cancelar a matrícula");
      });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onDelete();
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
        <div className="form-group">
          <label>Professor:</label>
          <span>{subject?.teacher.teacher_name}</span>
        </div>
        <div className="form-group">
          <label>Carga horária:</label>
          <span>{subject?.subject_workload}</span>
        </div>
        <div className="buttons-box">
          <button
            type="primary"
            onClick={showModal}
            className="btn-registered-subject"
          >
            Cancelar matrícula
          </button>
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
              Tem certeza que deseja cancelar a matrícula na disciplina?
            </p>
            <span className="modal-warning">
              Aviso: se cancelar a matrícula, não poderá acessar a disciplina
              novamente.
            </span>
            <div style={{ marginTop: 20 }} className="buttons-box">
              <button onClick={handleCancel}>Voltar</button>
              <button onClick={handleOk}>Cancelar matrícula</button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default RegisteredSubjectCard;
