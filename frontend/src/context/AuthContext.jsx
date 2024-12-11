import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [authuser, setAuthuser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );
  const [unreadMessages, setUnreadMessages] = useState(
    JSON.parse(localStorage.getItem("unreadmsg")) || {}
  );
  const [conversations, setConversations] = useState(
    JSON.parse(localStorage.getItem("moveupuser")) || []
  );
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  return (
    <AuthContext.Provider
      value={{
        authuser,
        setAuthuser,
        unreadMessages,
        setUnreadMessages,
        conversations,
        setConversations,
        suggestions,
        setSuggestions,
        search,
        setSearch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  return useContext(AuthContext);
};
