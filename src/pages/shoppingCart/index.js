import { Modal } from "antd";
import axios from "axios";
import React from "react";
import ItemCard from "../../components/itemCard";
import "./styles.css";

function ShoppingCart() {

  const [itens, setItens] = React.useState([]);
  const [filteredItens, setFilteredItens] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [deleteId, setDeleteId] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [totalValue, setTotalValue] = React.useState(0);

   React.useEffect(() => {
    if (deleteId !== 0) {
      deleteProduct();
    } else {
      setDeleteId(0);
    }
  }, [deleteId]);

  async function deleteProduct() {
    const filter = itens.filter((product) => product?.productId !== deleteId);
    setFilteredItens(filter);
  }

  React.useEffect(() => {
    let total = 0;
    itens.forEach((item) => {
      total = total + item.product.productPrice;
    });
    setTotalValue(total);
  }, [itens]);

  function onSearch(value) {
    setSearch(value);
    if (search !== "") {
      const filter = itens.filter(
        (item) =>
          item?.product?.productName
            .toLowerCase()
            .includes(value.toLowerCase()) || item.itemCode.includes(value)
      );
      setFilteredItens(filter);
    } else {
      setFilteredItens(itens);
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axios
      .get(`http://localhost:3333/orders/find-open-order/${1}`)
      .then((orders) => {
        axios
          .patch(
            `http://localhost:3333/orders/finish-order/${orders.data[0].orderId}`
          )
          .then(() => {
          });
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="search-bar">
        <input
          value={search}
          onChange={({ target }) => onSearch(target.value)}
          type="text"
          placeholder="Buscar por nome do produto ou código do item..."
        />
        <div className="glass"></div>
      </div>
      <div className="boxcard">
        {filteredItens.length > 0 &&
          filteredItens.map((item) => (
            <div key={item.itemCode} className="card">
              <ItemCard item={item} setDeleteId={setDeleteId} />
            </div>
          ))}
      </div>
      <div className="confirmation-card-container">
        <div className="confirmation-card">
          <p className="card-title">
            Valor total do pedido:{" "}
            <span style={{ color: "black", paddingLeft: 5 }}>
              R${totalValue}
            </span>
          </p>
          <button type="primary" onClick={showModal} className="btn-buy">
            Finalizar Pedido
          </button>
          <Modal
            title={null}
            open={isModalOpen}
            footer={null}
            className="shoppincart-modal"
            onCancel={handleCancel}
            bodyStyle={{
              width: "100%",
              borderRadius: 35,
              textAlign: "center",
              padding: 0,
            }}
          >
            <p className="modal-text">
              Tem certeza que deseja finalizar o pedido?
            </p>
            <p style={{ color: "#61a6ab", padding: 10 }}>
              Valor total:{" "}
              <span style={{ color: "black" }}>R${totalValue}</span>
            </p>
            <div className="buttons-box">
              <button onClick={handleCancel}>Cancelar</button>
              <button onClick={handleOk}>Finalizar</button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
