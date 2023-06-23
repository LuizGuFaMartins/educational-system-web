import { Modal } from "antd";
import React from "react";
import "./styles.css";

const ItemCard = ({ item, setDeleteId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  function onDelete() {
    setDeleteId(item.itemId);
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(item.itemId);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card-body">
      <div className="form-group">
        <label>Código do Item:</label>
        <span>{item.itemCode}</span>
      </div>
      <div className="form-group">
        <label>Produto:</label>
        <span>{item.product.productName}</span>
      </div>
      <div className="form-group">
        <label>Preço:</label>
        <span>R${item.product.productPrice}</span>
      </div>
      <div className="form-group">
        <label>Quantidade:</label>
        <span>{item.itemQuantity}</span>
      </div>
      <div className="form-group">
        <label>Valor total do item:</label>
        <span>R${item.itemQuantity * item.product.productPrice}</span>
      </div>
      <div className="remove-button">
        <button type="primary" onClick={showModal} className="btn-buy">
          Remover do carrinho
        </button>
        <Modal
          title={null}
          open={isModalOpen}
          footer={null}
          className="shoppincart-modal-remove-item"
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
            Tem certeza que deseja remover esse item do carrinho?
          </p>
          <div className="buttons-box">
            <button onClick={handleCancel}>Cancelar</button>
            <button onOk={handleOk}>Remover</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ItemCard;
