import { useAuth } from "../../Context/AuthContext";
import { useState, useEffect } from "react";
import Card from "../Layouts/Card";
import Container from "../Layouts/Container";
import Navbar from "../Layouts/Navbar";
import Title from "../Layouts/Title";

const Home = () => {
  const { token } = useAuth();
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
        <Title customClass="title">Minhas chaves de acesso</Title>
        <Container customClass="main">
          {data.Error ? window.location.replace("/login") : data.map((element) => (
            <Card
              name={element.name}
              site={element.site}
              username={element.username}
              password={element.password}
              id={element.id}
              key={element.id}
            />
          ))}
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
