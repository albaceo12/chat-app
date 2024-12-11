import { useEffect, useRef, useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { moveUserToTop } from "../../utils/moveUserToTop";

// import useConversation from "../../zustand/useConversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const {
    unreadMessages,
    setUnreadMessages,
    setConversations,
    suggestions,
    setSuggestions,
    setSearch,
  } = useAuthContext();
  const { socket, onlineUsers } = useSocketContext();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const touch = useRef();
  // moveUserToTop();
  useEffect(() => {
    socket?.on("unreadmessages", (newMessage) => {
      if (selectedConversation?._id !== newMessage.senderId) {
        // console.log(selectedConversation, newMessage);
        setUnreadMessages((pre) => ({
          ...pre,
          [newMessage.senderId]: (pre[newMessage.senderId] || 0) + 1,
        }));
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
      }
    });
    return () => socket?.off("unreadmessages"); //its very important to not to listen event more than once
  }, [socket, setUnreadMessages, unreadMessages]);
  useEffect(() => {
    // moveUserToTop(newMessage.senderId);
    // console.log(2, unreadMessages);
    localStorage.setItem("unreadmsg", JSON.stringify(unreadMessages));
    localStorage.setItem("moveupuser", JSON.stringify(conversations));
  }, [unreadMessages, conversations]);
  const handleSelectUser = (user) => {
    setSuggestions([]);
    setSelectedConversation(user);
    setSearch("");
  };
  return (
    <>
      {suggestions.length > 0 && (
        <ul
          className=" bg-base-200 rounded-box shadow-lg absolute mt-2 w-20 max-h-60 overflow-y-auto min-w-[269px] max-785:min-w-[237px] max-650:min-w-[90px]  z-50 hover:bg-primary transition-all duration-200"
          style={{ background: "#86ff00", top: "11%" }}
        >
          {suggestions.map((user, index) => (
            <li
              className=" hover:text=black cursor-pointer px-4 py-2"
              key={user._id}
              onClick={() => handleSelectUser(user)}
            >
              <Conversation
                key={user._id}
                unread={
                  unreadMessages[user._id] ? unreadMessages[user._id] : ""
                }
                conversation={user}
                emoji={getRandomEmoji()}
                lastIdx={index === suggestions.length - 1}
              />
            </li>
          ))}
        </ul>
      )}
      <div className="py-2 flex flex-col overflow-auto relative">
        {conversations.map((conversation, index) => (
          // <div  ref={serchedConversation}>console.log(conversation._id)
          <Conversation
            key={conversation._id}
            unread={
              unreadMessages[conversation._id]
                ? unreadMessages[conversation._id]
                : ""
            }
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={index === conversations.length - 1}
          />
          // </div>
        ))}

        {loading ? (
          <span className="loading loading-spinner mx-auto"></span>
        ) : null}
      </div>
    </>
  );
};
export default Conversations;

// STARTER CODE SNIPPET
// import Conversation from "./Conversation";

// const Conversations = () => {
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 		</div>
// 	);
// };
// export default Conversations;
