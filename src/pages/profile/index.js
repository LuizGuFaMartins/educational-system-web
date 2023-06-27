import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../services/api";
import { logout } from "../../services/auth";
import "./styles.css";

const Profile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isUnnactiveModalOpen, setIsUnnactiveModalOpen] = React.useState(false);

  React.useEffect(() => {
    api
      .get(`/login/${localStorage.getItem("loginId")}`)
      .then((res) => {
        setLogin(res.data);
        setNome(res.data.login_name);
        setEmail(res.data.login_email);
      })
      .catch((error) => {
        console.log(error);
        if (error?.response && error.response.status === 401) {
          navigate("/login");
          logout();
        }
        toast.error("Erro ao buscar dados do usuário");
      });
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    api
      .put(`/login/${login.login_id}`, { loginName: nome, loginEmail: email })
      .then(() => {
        toast.success("Usuário atualizado com sucesso");
        setIsModalOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showUnnactiveModal = () => {
    setIsUnnactiveModalOpen(true);
  };

  const handleUnnactiveOk = () => {
    api
      .put(`/login/unnactive/${login.login_id}`, { ...login })
      .then(() => {
        setIsUnnactiveModalOpen(false);
        logout();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao deletar conta");
      });
  };

  const handleUnnactiveCancel = () => {
    setIsUnnactiveModalOpen(false);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={{ height: "100%" }} className="profile-container">
        <div className="form-box">
          <form onSubmit={(event) => event.preventDefault()}>
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
                onChange={handleEmailChange}
              />
            </div>
            <div className="profile-button-box">
              <button
                type="primary"
                onClick={showUnnactiveModal}
                className="btn-buy"
              >
                Desativar conta
              </button>
              <Modal
                title={null}
                open={isUnnactiveModalOpen}
                footer={null}
                className="profile-modal"
                onOk={handleUnnactiveOk}
                onCancel={handleUnnactiveCancel}
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
                  <button onClick={handleUnnactiveCancel}>Cancelar</button>
                  <button onClick={handleUnnactiveOk}>Desativar</button>
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
    </>
  );
};

export default Profile;
