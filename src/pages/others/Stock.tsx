import { Button } from "@mui/material";
import { useMemo, useState } from "react";
import { formatDate } from "@/utils/date";
import AddIcon from "@mui/icons-material/Add";
import { AddStockForm } from "@/components/forms";
import { StockColumn, StockItem } from "@/lib/types/StockItemTypes";
import { useGetStockItemsQuery } from "@/features/stock/stockAPI";
import { Search, GlobalModal, ReusableGrid } from "@/components/reusable";



const Stock = () => {
  const [openStockAdd, setOpenStockAdd] = useState(false);
  const {
    data: stockItems,
    // error,
    //  isLoading
  } = useGetStockItemsQuery([]);
  const [data, setData] = useState(stockItems);
  const [colDefs, setColDefs] = useState<StockColumn[]>([
    { field: "name", flex: 1 },
    { field: "price", flex: 1 },
    { field: "category", flex: 1 },
    { field: "brand", flex: 1 },
    { field: "last_updated", flex: 1 },
    { field: "quantity", flex: 1 },
  ]);

  console.log(data, "stock items");

  console.log(setData, setColDefs);

  const rows = useMemo(() => {
    return data?.map((item: StockItem) => ({
      name: item.product.name,
      price: parseFloat(item.product.price_per_item),
      last_updated: formatDate(item.last_updated),
      quantity: item.quantity,
      category: item.product.category,
      brand: item.product.brand.name,
    }));
  }, [data]);

  function stockModalOpener() {
    setOpenStockAdd((prev: boolean) => !prev);
  }

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
            onClick={stockModalOpener}
          >
            <AddIcon />
            <span className="p-1">Add stock</span>
          </Button>
        </div>

        <div id="stock-table" className="w-full mt-4">
          <ReusableGrid rows={rows} colsDefs={colDefs} />
        </div>
      </div>

      <GlobalModal
        open={openStockAdd}
        closeFunc={() => setOpenStockAdd((prev: boolean) => !prev)}
        children={<AddStockForm />}
      />
    </section>
  );
};
export default Stock;
