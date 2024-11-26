import { useEffect, useRef } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";
// import useConversation from "../../zustand/useConversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  // const { search, setSearch } = useConversation();
  const serchedConversation = useRef();
  // console.log(conversations);
  // useEffect(() => {
  //   serchedConversation.current?.scrollIntoView({ behavior: "smooth" });
  // }, [setSearch]);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => (
        // <div  ref={serchedConversation}>
        <Conversation
          key={conversation._id}
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
