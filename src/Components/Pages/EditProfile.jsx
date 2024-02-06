import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import Container from "../Layouts/Container";
import Navbar from "../Layouts/Navbar";
import Title from "../Layouts/Title";
import FormEditProfile from "../Layouts/Form/FormEditProfile";

const EditProfile = () => {
  const [user, setUser] = useState({});
  const { token } = useAuth();
  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL+"/api/user/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => setUser(result))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <Container>
      <Navbar />
      <Container customClass="main">
        <Title customClass="title">
          Atualize suas informações,{" "}
          <span style={{ color: "var(--green-200)" }}>
            {user.name?.split(" ")[0]}
          </span>
        </Title>
        <Container customClass="main">
            <FormEditProfile name={user.name} email={user.email} />
        </Container>
      </Container>
    </Container>
  );
};

export default EditProfile;
