import Style from "./style.module.css";

const Container = ({ children, customClass }) => {
  return (
    <div className={`${Style.container} ${Style[customClass]}`}>{children}</div>
  );
};

export default Container;
