import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";

function useGetConversations() {
  const [loading, setLoading] = useState(false);
  // const [conversations, setConversations] = useState([]);
  const { conversations, setConversations } = useAuthContext();
  const { onlineUsers } = useSocketContext();
  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations((pre) => {
          // console.log(pre);
          if (!pre.length) {
            return data.filteredUsers;
          } else if (data.filteredUsers.length > pre.length) {
            return [...pre, data.filteredUsers[pre.length]];
          }
          return pre;
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, [onlineUsers]);
  return { loading, conversations };
}

export default useGetConversations;
