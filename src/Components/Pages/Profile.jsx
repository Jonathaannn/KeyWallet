import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import Container from "../Layouts/Container";
import Navbar from "../Layouts/Navbar";
import Title from "../Layouts/Title";
import CardUser from "../Layouts/CardUser";

const Profile = () => {
  const { token } = useAuth();
  const [infoUser, setInfoUser] = useState({});
  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL+"/api/user/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => setInfoUser(result))
      .catch((err) => console.error(err));
  }, [token]);

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL+"/api/account/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <Container>
      <Navbar />
      <Container customClass="main">
        <Title customClass="title">Informações do usuário</Title>
        <Container customClass="main">
          <CardUser
            name={infoUser.name}
            email={infoUser.email}
            dataAccounts={data.length}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default Profile;
