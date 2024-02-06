import Style from "./style.module.css";
import { useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { FiUser, FiTrash2, FiEdit } from "react-icons/fi";
import ModalInfo from "../ModalInfo";

const CardUser = ({ name, email, dataAccounts }) => {
  const [modalDeleteAccount, setModalDeleteAccount] = useState(false);
  const [modalClearAccount, setModalClearAccount] = useState(false);
  const { token } = useAuth();

  const deleteAccount = async (password) => {
    const response = await fetch(process.env.REACT_APP_BASE_URL+"/api/user/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      window.location.reload();
      return alert("Não foi possível excluir a conta!");
    }
    return window.location.replace("/login");
  };

  const clearData = async (password) => {
    const response = await fetch(process.env.REACT_APP_BASE_URL+
      "/api/account/delete/all",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      }
    );
    if (!response.ok) {
      window.location.reload();
      return alert("Não foi possível limpar os dados da conta!");
    }
    return window.location.reload();
  };

  return (
    <div className={Style.screen}>
      <div className={Style.container}>
        <div className={Style.header}>
          <FiUser size={48} />
          <span>Olá, {name?.split(" ")[0]}</span>
        </div>
        <div className={Style.body}>
          <div className={Style.item}>
            <span>E-mail:</span>
            <p>{email}</p>
          </div>
          <div className={Style.item}>
            <span>Name:</span>
            <p>{name}</p>
          </div>
          <div className={Style.item}>
            <span>
              {name?.split(" ")[0]}, atualmente você tem {dataAccounts} chave(s)
              regsistrada(s)
            </span>
          </div>
          <div className={Style.buttons}>
            <button
              className={`${Style.button} ${Style.success}`}
              onClick={() => window.location.replace("/profile/edit")}
            >
              <FiEdit size={24} />
              Edit account
            </button>
            <button
              className={`${Style.button} ${Style.danger}`}
              onClick={() => setModalDeleteAccount(true)}
            >
              <FiTrash2 size={24} />
              Delete account
            </button>
            <button
              className={`${Style.button} ${Style.danger}`}
              onClick={() => setModalClearAccount(true)}
            >
              <FiTrash2 size={24} />
              Clear data
            </button>
          </div>
        </div>
      </div>
      {modalDeleteAccount && (
        <ModalInfo
          title="Excluir conta"
          handle={(password) => deleteAccount(password)}
          isOpen={setModalDeleteAccount}
        >
          {name?.split(" ")[0]}, desaja relmente continuar com esse processo.
          Todos os dados salvos serão apagados!
        </ModalInfo>
      )}
      {modalClearAccount && (
        <ModalInfo
          title="Limpar dados da conta"
          handle={(password) => clearData(password)}
          isOpen={setModalClearAccount}
        >
          {name?.split(" ")[0]}, desaja relmente continuar com esse processo.
          Todos os dados salvos serão apagados!
        </ModalInfo>
      )}
    </div>
  );
};

export default CardUser;
