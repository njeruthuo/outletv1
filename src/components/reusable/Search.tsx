import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBarProps } from "@/lib/types/SearchTypes";
import { useSearchStockQuery } from "@/features/stock/stockAPI";

const Search: React.FC<SearchBarProps> = ({ setFunc }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [query, setQuery] = useState("");

  const getSearchContext = (pathname: string) => {
    if (pathname.includes("/stock")) return "STOCK";
    if (pathname.includes("/products")) return "Products";
    if (pathname.includes("/orders")) return "Orders";
    if (pathname.includes("/customers")) return "Customers";
    if (pathname.includes("/reports")) return "Reports";
    return null;
  };

  const context = getSearchContext(pathname);

  const { data: searchResults } = useSearchStockQuery(query, {
    skip: context !== "STOCK" || !query,
  });

  const handleSearch = (inputQuery: string) => {
    setQuery(inputQuery);
    if (context === "STOCK" && searchResults) {
      setFunc(searchResults);
    }
  };

  return (
    <div
      id="search"
      className="border-2 border-gray-300 p-2 rounded-md flex items-center space-x-2 focus-within:border-blue-500 transition-all duration-200 ease-in-out"
    >
      <input
        type="text"
        name="search"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        className="outline-none bg-transparent w-full placeholder-gray-400 text-gray-800 focus:ring-0"
      />
      <span className="text-gray-500 hover:text-gray-700 transition-colors duration-150 ease-in-out cursor-pointer">
        <SearchIcon />
      </span>
    </div>
  );
};
export default Search;
