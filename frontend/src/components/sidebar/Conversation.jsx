// import { useSocketContext } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
const Conversation = (props) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === props.conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(props.conversation._id);
  const { setUnreadMessages } = useAuthContext();
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        } `}
        onClick={() => {
          setSelectedConversation(props.conversation);
          localStorage.removeItem("unread");
          setUnreadMessages((pre) => ({
            ...pre,
            [props.conversation._id]: 0,
          }));
        }}
      >
        {/* ${isOnline ? "online" : ""} */}
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={props.conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1 max-650:hidden transition-all duration-200">
          <div className="flex gap-3 justify-between items-center">
            <p className="font-bold text-gray-200">
              {props.conversation.fullName}
            </p>
            {props.unread > 0 && (
              <span
                className="badge"
                style={{
                  background: "blue",
                  color: "white",
                  fontSize: "12px",
                  padding: "2px 6px",
                  borderRadius: "50%",
                  marginLeft: "8px",
                }}
              >
                {props.unread}
              </span>
            )}
            <span className="text-xl">{props.emoji}</span>
          </div>
        </div>
      </div>
      {!props.lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;

// STARTER CODE SNIPPET
// const Conversation = () => {
// 	return (
// 		<>
// 			<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// 				<div className='avatar online'>
// 					<div className='w-12 rounded-full'>
// 						<img
// 							src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
// 							alt='user avatar'
// 						/>
// 					</div>
// 				</div>

// 				<div className='flex flex-col flex-1'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>John Doe</p>
// 						<span className='text-xl'>🎃</span>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='divider my-0 py-0 h-1' />
// 		</>
// 	);
// };
// export default Conversation;
