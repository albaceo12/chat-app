import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

import { useAuthContext } from "../../context/AuthContext";

const Message = (props) => {
  const { authuser, setAuthuser } = useAuthContext();
  const { selectedConversation } = useConversation();
  // console.log(props.message.newmessage.senderId, authuser.data.user._id);
  const fromMe = props.message.senderId === authuser.data.user._id;
  const formattedTime = extractTime(props.message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authuser.data.user.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  // const shakeClass = message.shouldShake ? "shake" : "";

  return (
    // ${chatClassName}
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        // ${bubbleBgColor} ${shakeClass}
        className={`chat-bubble text-white pb-2 ${bubbleBgColor}`}
      >
        {props.message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
