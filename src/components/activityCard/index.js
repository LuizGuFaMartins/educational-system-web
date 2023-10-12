import { Modal } from "antd";
import React from "react";

import "./styles.css";
import dayjs from "dayjs";

const ActivityCard = ({ activity, setDeleteId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
        <span>{dayjs(activity?.activity_init).format("DD/MM/YYYY HH:mm")}</span>
      </div>
      <div className="activity-form-group">
        <label>Data de fim:</label>
        <span>{dayjs(activity?.activity_end).format("DD/MM/YYYY HH:mm")}</span>
      </div>
      <div className="buttons-box">
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
