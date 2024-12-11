import { useAuthContext } from "../context/AuthContext";

export function moveUserToTop(senderId) {
  const { setConversations } = useAuthContext();
  setConversations((prev) => {
    const updatedAllUsers = [...prev];
    const index = updatedAllUsers.findIndex((user) => user._id === senderId);
    if (index !== -1) {
      const [user] = updatedAllUsers.splice(index, 1);
      updatedAllUsers.unshift(user);
    }
    console.log(updatedAllUsers);
    return updatedAllUsers;
  });
}
