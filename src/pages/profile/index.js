import { Modal } from "antd";
import React from "react";
import api from "../../services/api";
import "./styles.css";

const Profile = () => {
  const [email, setEmail] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [preco, setPreco] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    api
      .get(`/login/${localStorage.getItem("loginId")}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handlePrecoChange = (event) => {
    setPreco(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // const product = {
    //   productCode: codigo,
    //   productName: nome,
    //   productPrice: preco,
    // };
    // setCodigo(uuid().split("-")[0]);
    // setNome("");
    // setPreco("");
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ height: "100%" }} className="profile-container">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div className="profile-input-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={handleNomeChange}
            />
          </div>
          <div className="profile-input-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="text"
              id="email"
              value={email}
              disabled={true}
              onChange={handleEmailChange}
            />
          </div>
          <div className="profile-button-box">
            <button type="primary" onClick={showModal} className="btn-buy">
              Desativar conta
            </button>
            <Modal
              title={null}
              open={isModalOpen}
              footer={null}
              className="profile-modal"
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
                Tem certeza que deseja desativar a conta?
              </p>
              <div className="buttons-box">
                <button onClick={handleCancel}>Cancelar</button>
                <button onClick={handleOk}>Desativar</button>
              </div>
            </Modal>
            <button type="primary" onClick={showModal} className="btn-buy">
              Atualizar
            </button>
            <Modal
              title={null}
              open={isModalOpen}
              footer={null}
              className="profile-modal"
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
                Tem certeza que deseja atualizar a conta?
              </p>
              <div className="buttons-box">
                <button onClick={handleCancel}>Cancelar</button>
                <button onClick={handleOk}>Atualizar</button>
              </div>
            </Modal>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
