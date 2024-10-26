import { Search } from "@/components/reusable";
import ReusableGrid from "@/components/reusable/ReusableGrid";
import { useGetStockItemsQuery } from "@/features/stock/stockAPI";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useMemo, useState } from "react";

const formatDate = (input: Date) => {
  const date = new Date(input);
  const day = date.getDay().toString().padStart(2, "0");
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}-${month + 1}-${year}`;
};

const Stock = () => {
  const { data: stockItems, error, isLoading } = useGetStockItemsQuery();

  const [data, setData] = useState(stockItems);

  const rows = useMemo(() => {
    return data?.map((item) => ({
      name: item.product.name,
      price: parseFloat(item.product.price_per_item),
      last_updated: formatDate(item.last_updated),
      quantity: item.quantity,
      category: item.product.category,
      brand: item.product.brand.name,
    }));
  }, [data]);


  return (
    <section className="flex w-full ">
      <div className="w-full">
        {/* Add stock button will be exactly here */}
        {/* We will see the list of stock items and their quantities */}
        {/* We will have a way to CRUD stock items here. */}
        {/* We will have a way to distribute the stock to distribution centers */}
        <div className="flex justify-end w-full space-x-4 place-items-center">
          <div className="mr-auto">
            <p className="text-2xl font-bold">Stock Management</p>
          </div>

          <div id="filter">
            {/* Filter settings will appear here */}
            {/* <TuneIcon className="hover:cursor-pointer" /> */}
            <img src="/filter.svg" className="h-10" alt="" />
          </div>

          <Search />

          <Button
            variant="contained"
            color="info"
            className="p-1 flex place-items-center"
          >
            <AddIcon />
            <span className="p-1">Add stock</span>
          </Button>
        </div>

        <div id="stock-table" className="w-full mt-4">
          <ReusableGrid rows={rows} />
        </div>
      </div>
    </section>
  );
};
export default Stock;
