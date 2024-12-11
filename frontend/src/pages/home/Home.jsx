import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
// min-260:h-[400px] min-330:h-[410px] min-400:h-[440px]
const Home = () => {
  return (
    <div className="flex  min-260:h-[480px] md:h-[500px] max-650:w-full  rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 transition-all duration-200">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
