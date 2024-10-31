import SearchIcon from "@mui/icons-material/Search";
import { SearchBarProps, SearchContext } from "@/lib/types/SearchTypes";

const Search: React.FC<SearchBarProps> = ({ context }) => {
  const handleSearch = (query: string) => {
    console.log(query, "Query");
    switch (context) {
      case SearchContext.Home:
        // handle search logic for Home
        break;
      case SearchContext.Products:
        // handle search logic for Products
        break;
      case SearchContext.Orders:
        // handle search logic for Orders
        break;
      case SearchContext.Customers:
        // handle search logic for Customers
        break;
      case SearchContext.Reports:
        // handle search logic for Reports
        break;
      default:
        break;
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
