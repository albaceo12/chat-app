import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
const SocketContext = createContext();

export const SocketContextProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authuser } = useAuthContext();
  useEffect(() => {
    if (authuser) {
      //   console.log(authuser.data.user._id);
      const socket = io("http://localhost:5000", {
        query: {
          userId: authuser.data.user._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineusers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authuser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {props.children}
    </SocketContext.Provider>
  );
};
export const useSocketContext = () => {
  return useContext(SocketContext);
};
