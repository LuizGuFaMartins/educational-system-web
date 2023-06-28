import { Modal } from "antd";
import React from "react";

import "./styles.css";

const RegisteredSubjectCard = ({ subject, setDeleteId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);

  function onDelete() {
    setDeleteId(subject.subject_id);
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
      <div className="buttons-box">
        <button type="primary" onClick={showModal} className="btn-registered-subject">
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
  );
};

export default RegisteredSubjectCard;
