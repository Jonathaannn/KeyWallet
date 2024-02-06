import Style from "./style.module.css";

const Title = ({ children, customClass }) => {
  return <div className={`${Style[customClass]}`}>{children}</div>;
};

export default Title;
