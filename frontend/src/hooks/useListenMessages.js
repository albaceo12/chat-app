import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import notificationSound from "../assets/sounds/notification.mp3";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
// import moveUserToTop from "../utils/moveUserToTop";
const useListeneMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const { setConversations } = useAuthContext();
  // console.log(authuser.data.user._id);
  // console.log(messages);
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId === selectedConversation._id) {
        // console.log(newMessage.senderId, selectedConversation._id);
        newMessage.shouldshake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage]);
        setConversations((prev) => {
          const updatedAllUsers = [...prev];
          const index = updatedAllUsers.findIndex(
            (user) => user._id === newMessage.senderId
          );
          if (index !== -1) {
            const [user] = updatedAllUsers.splice(index, 1);
            updatedAllUsers.unshift(user);
          }
          // console.log(updatedAllUsers);
          return updatedAllUsers;
        });
      } else {
        socket?.off("newMessage");
      }
    });
    return () => socket?.off("newMessage"); //its very important to not to listen event more than once
  }, [setMessages, messages]);
};

export default useListeneMessages;
