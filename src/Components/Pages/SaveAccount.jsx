import FormCreate from "../Layouts/Form/FormCreate";
import Container from "../Layouts/Container";
import Navbar from "../Layouts/Navbar";
import Title from "../Layouts/Title";

const SaveAccount = () => {
  return (
    <Container>
      <Navbar />
      <Container customClass="main">
        <Title customClass="title">
            Salvar uma nova chave
        </Title>
        <Container customClass="main">
          <FormCreate />
        </Container>
      </Container>
    </Container>
  );
};

export default SaveAccount;
