import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

import Login from "../Components/Pages/Login";
import Register from "../Components/Pages/Register";
import Home from "../Components/Pages/Home";
import SaveAccount from "../Components/Pages/SaveAccount";
import EditAccount from "../Components/Pages/EditAccount";
import Profile from "../Components/Pages/Profile";
import EditProfile from "../Components/Pages/EditProfile";

const RoutesContent = () => {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Login />}
      />
      <Route
        path="/account/create"
        element={isAuthenticated ? <SaveAccount /> : <Login />}
      />
      <Route
        path="/account/edit"
        element={isAuthenticated ? <EditAccount /> : <Login />}
      />
      <Route
        path="/profile/me"
        element={isAuthenticated ? <Profile /> : <Login />}
      />
      <Route
        path="/profile/edit"
        element={isAuthenticated ? <EditProfile /> : <Login />}
      />
    </Routes>
  );
};

export default RoutesContent;
