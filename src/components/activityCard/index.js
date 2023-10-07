import { Modal } from "antd";
import React from "react";

import "./styles.css";

const ActivityCard = ({ activity, setDeleteId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);

  function onDelete() {
    setDeleteId(activity.subject_id);
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
    <div className="activity-card-body">
      <div className="activity-form-group">
        <label>Atividade:</label>
        <span>{activity?.activity_name}</span>
      </div>
      <div className="activity-form-group">
        <label>Disciplina:</label>
        <span>{activity?.subject.subject_name}</span>
      </div>
      <div className="activity-form-group">
        <label>Data de início:</label>
        <span>{activity?.activity_init}</span>
      </div>
      <div className="activity-form-group">
        <label>Data de fim:</label>
        <span>{activity?.activity_end}</span>
      </div>
      <div className="buttons-box">
        {/* <button type="primary" onClick={showModal} className="btn-buy">
          Concluir
        </button> */}
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
            Tem certeza que deseja cancelar a inscrição na disciplina?
          </p>
          <span className="modal-warning">
            Aviso: se cancelar a inscrição, não poderá acessar a disciplina
            novamente.
          </span>
          <div style={{ marginTop: 20 }} className="buttons-box">
            <button onClick={handleCancel}>Voltar</button>
            <button onClick={handleOk}>Concluir</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ActivityCard;
