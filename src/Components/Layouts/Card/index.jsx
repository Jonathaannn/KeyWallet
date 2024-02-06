import Style from "./style.module.css";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Title from "../Title";
import Modal from "../Modal";

const Card = ({ name, site, username, password, id }) => {
  const [stateModal, setSatateModal] = useState(false);
  const handleStateModal = () => {
    setSatateModal(!stateModal);
  };
  return (
    <>
      <div
        className={Style.container}
        onClick={handleStateModal}
      >
        <div className={Style.body}>
          <div className={Style.logo}>{name.substring(0, 2)}</div>
          <span>
            <Title customClass="minTitle-light">{name}</Title> ver informações
          </span>
        </div>
        <FiChevronRight size={36} />
      </div>
      {stateModal && (
        <Modal
          state={setSatateModal}
          name={name}
          site={site}
          username={username}
          password={password}
          id={id}
        />
      )}
    </>
  );
};

export default Card;
