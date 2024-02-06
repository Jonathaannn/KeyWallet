import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = async (email, password) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        return window.alert("Falha na autenticação!");
      }

      const data = await response.json();
      const accessToken = data.token;

      localStorage.setItem("token", accessToken);
      setToken(accessToken);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Falha ao executar o useAuth, uso incorreto!");
  }
  return context;
};

export default AuthContext;
