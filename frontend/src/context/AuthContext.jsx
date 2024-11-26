import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [authuser, setAuthuser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );
  return (
    <AuthContext.Provider value={{ authuser, setAuthuser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  return useContext(AuthContext);
};
