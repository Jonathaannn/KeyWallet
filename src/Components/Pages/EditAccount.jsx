import { useLocation } from "react-router-dom";
import Container from "../Layouts/Container";
import FormEdit from "../Layouts/Form/FormEdit";
import Navbar from "../Layouts/Navbar";
import Title from "../Layouts/Title";

const EditAccount = ({ name, username, password, id }) => {
  const location = useLocation();
  const data = location.state.user;
  return (
    <Container>
      <Navbar />
      <Container customClass="main">
        <Title customClass="title">
          Edite as informações do{" "}
          <span style={{ color: "var(--green-200)" }}>{data.name}</span>
        </Title>
        <Container customClass="main">
          <FormEdit />
        </Container>
      </Container>
    </Container>
  );
};

export default EditAccount;
