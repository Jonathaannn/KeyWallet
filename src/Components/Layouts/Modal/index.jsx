import Style from "./style.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import {
  FiClipboard,
  FiExternalLink,
  FiEye,
  FiX,
  FiCheck,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import Title from "../Title";

const Modal = ({ state, name, site, username, password, id }) => {
  const navigate = useNavigate();
  const user = { name, username, password, id };

  const [showpassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showpassword);
  };

  const maskPassword = (password) => {
    return "*".repeat(password.length);
  };

  const [copied, setCopied] = useState(false);
  const handleClip = async (dataValue) => {
    navigator.clipboard.writeText(dataValue);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const { token } = useAuth();
  const handleDeleteAccount = async () => {
    const response = await fetch(process.env.REACT_APP_BASE_URL+
      `/api/account/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      alert("Impossível deletar os dados");
    }
    window.location.reload();
  };

  const handlenavigate = (site) => {
    window.open(site, "_blank");
  };

  return (
    <div className={Style.screen}>
      <div className={Style.container}>
        <FiX
          size={36}
          className={Style.close}
          onClick={() => state(false)}
        />
        <div className={Style.header}>
          <span className={Style.logo}>{name.substring(0, 2)}</span>
          <Title customClass="subtitleModal">{name}</Title>
        </div>
        <div className={Style.body}>
          <div className={Style.item}>
            <div className={Style.info}>
              <span>Email/Username: </span> <p>{username}</p>
            </div>{" "}
            <div className={Style.buttons}>
            <FiClipboard
              size={24}
              className={Style.button}
              onClick={() => handleClip(username)}
            />
            </div>
          </div>
          <div className={Style.item}>
            <div className={Style.info}>
              <span>Password: </span>{" "}
              <p>{showpassword ? password : maskPassword(password)}</p>
            </div>{" "}
            <div className={Style.buttons}>
              <FiEye
                size={24}
                className={Style.button}
                onClick={handleShowPassword}
              />{" "}
              <FiClipboard
                size={24}
                className={Style.button}
                onClick={() => handleClip(password)}
              />
            </div>
          </div>
          <div className={Style.item}>
            <div className={Style.info}>
              <span>Website address: </span> <p>{site}</p>
            </div>{" "}
            <div className={Style.buttons}>
              <FiExternalLink
                size={24}
                className={Style.button}
                onClick={() => handlenavigate(site)}
              />{" "}
              <FiClipboard
                size={24}
                className={Style.button}
                onClick={() => handleClip(site)}
              />
            </div>
          </div>
          <div className={Style.item}>
            <div className={Style.info}>
              <span>Data management: Atualize ou Apague as informações</span>
            </div>{" "}
            <div className={Style.buttons}>
              <FiEdit
                size={24}
                className={Style.button}
                onClick={() =>
                  navigate("/account/edit", { state: { user } })
                }
              />
              <FiTrash2
                size={24}
                className={Style.button}
                onClick={handleDeleteAccount}
              />
            </div>
          </div>
        </div>
        {copied && (
          <div className={Style.message}>
            <FiCheck size={24} /> Copiado com sucesso!
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
