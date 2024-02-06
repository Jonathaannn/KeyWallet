import Style from "./style.module.css";
import { useState } from "react";
const ModalInfo = ({ children, title, handle, isOpen }) => {
const [inputValue, setInputValue] = useState("")

const handleFunction = () => {
    if (inputValue === "") {
        isOpen(false)
        return alert("O campo não foi preenchido!")
    }
    return handle(inputValue)
}

  return (
    <div className={Style.screen}>
      <div className={Style.container}>
        <span className={Style.title}>{title}</span>
        <p className={Style.info}>{children}</p>
        <input
          type="password"
          className={Style.input}
          value={inputValue}
          placeholder="Digite sua senha para continuar"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className={Style.buttons}>
          <button className={Style.danger} onClick={() => isOpen(false)}>Cancel</button>
          <button className={Style.success} onClick={handleFunction}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;
