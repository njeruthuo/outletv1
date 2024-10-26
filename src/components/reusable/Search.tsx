import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <div
      id="search"
      className="border-2 border-gray-300 p-2 rounded-md flex items-center space-x-2 focus-within:border-blue-500 transition-all duration-200 ease-in-out"
    >
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="outline-none bg-transparent w-full placeholder-gray-400 text-gray-800 focus:ring-0"
      />
      <span className="text-gray-500 hover:text-gray-700 transition-colors duration-150 ease-in-out cursor-pointer">
        <SearchIcon />
      </span>
    </div>
  );
};
export default Search;
