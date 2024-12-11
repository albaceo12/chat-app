import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
const SearchInput = () => {
  // const [search, setSearch] = useState("");
  const { suggestions, setSuggestions, search, setSearch } = useAuthContext();
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return null;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };
  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
    } else {
      const lowercasequery = search.toLocaleLowerCase();
      const filteredSugestions = conversations.filter((user) =>
        user.fullName.toLowerCase().includes(lowercasequery)
      );
      if (filteredSugestions.length) {
        setSuggestions(filteredSugestions);
      } else {
        toast.error("No such user found!");
        setSuggestions([]);
        // setSearch("");
      }
    }
  }, [search, conversations]);
  return (
    <>
      <form
        className="flex items-center gap-2 max-650:justify-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered rounded-full max-650:hidden max-784:w-[181px] transition-all duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-circle bg-sky-500 text-white max-650:hidden  transition-all duration-200"
        >
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
    </>
  );
};
export default SearchInput;

// STARTER CODE SNIPPET
// import { IoSearchSharp } from "react-icons/io5";

// const SearchInput = () => {
// 	return (
// 		<form className='flex items-center gap-2'>
// 			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
// 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' />
// 			</button>
// 		</form>
// 	);
// };
// export default SearchInput;
