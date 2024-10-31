import { Button } from "@mui/material";
import { formatDate } from "@/utils/date";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useMemo, useState } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { AddStockForm, UpdateStockForm } from "@/components/forms";
import {
  useDeleteStockMutation,
  useGetStockItemsQuery,
} from "@/features/stock/stockAPI";
import { StockColumn, StockItem, StockRow } from "@/lib/types/StockItemTypes";
import { Search, GlobalModal, ReusableGrid } from "@/components/reusable";
import DeleteAction from "@/components/forms/DeleteAction";
// import AddPrompt from "@/components/custom/AddPrompt";
import { SearchContext } from "@/lib/types/SearchTypes";

const Stock = () => {
  const [openStockAdd, setOpenStockAdd] = useState(false);
  const [updatePayload, setUpdatePayload] = useState<StockRow>();
  const { data: stockItems } = useGetStockItemsQuery([]);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [data, setData] = useState([]);
  const [searchedStock, setSearchedStock] = useState([]);

  console.log(searchedStock, "searched");

  useEffect(() => {
    if (searchedStock.length > 0) {
      setData(searchedStock); // Update with search results if available
    } else if (stockItems) {
      setData(stockItems); // Default to stock items if no search results
    }
  }, [stockItems, searchedStock]);

  const CustomButtonComponent = (props: ICellRendererParams) => {
    return (
      <div
        className="flex h-full justify-center items-center"
        onClick={() => infoModalOpener(props)}
      >
        <img src="/info.svg" />
      </div>
    );
  };

  const CustomDeleteButtonComponent = (props: ICellRendererParams) => {
    const [deleteStock] = useDeleteStockMutation();
    const handleDelete = async (data: ICellRendererParams) => {
      try {
        await deleteStock(data.data?.id).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div
        className="flex h-full justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <DeleteAction data={props} onConfirm={() => handleDelete(props)} />
      </div>
    );
  };

  const [colDefs, setColDefs] = useState<StockColumn[]>([
    { field: "name", flex: 1, headerName: "Product Name" },
    { field: "price", flex: 1, headerName: "Price per unit" },
    { field: "category", flex: 1 },
    { field: "brand", flex: 1 },
    { field: "last_updated", flex: 1, headerName: "Last Updated" },
    { field: "quantity", flex: 1 },
    {
      field: "info",
      flex: 0.5,
      headerName: "",
      cellRenderer: CustomButtonComponent,
    },
    {
      field: "delete",
      flex: 0.5,
      headerName: "",
      cellRenderer: CustomDeleteButtonComponent,
    },
  ]);

  if ("njeru " === String("njeru")) {
    console.log(setData, setColDefs);
  }

  const rows = useMemo(() => {
    return data?.map((item: StockItem) => ({
      id: item.id,
      name: item.product.name,
      price: parseFloat(item.product.price_per_item),
      last_updated: formatDate(item.last_updated),
      quantity: item.quantity,
      category: item.product.category.name,
      brand: item.product.brand.name,
    }));
  }, [data]);

  function stockModalOpener() {
    setOpenStockAdd((prev: boolean) => !prev);
  }

  function infoModalOpener(props: ICellRendererParams) {
    setUpdatePayload(props.data);
    setOpenInfoModal((prev: boolean) => !prev);
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

          {/* Working on the searchbar currently */}
          <Search context={SearchContext.Products} setFunc={setSearchedStock} />

          <Button
            variant="contained"
            color="info"
            className="p-1 flex place-items-center"
            onClick={stockModalOpener}
          >
            <AddIcon />
            <span className="p-1">stock</span>
          </Button>

          {/* <div className="hover:cursor-pointer flex p-2 bg-customPale rounded-full">
            <AddPrompt />
          </div> */}
        </div>

        <div id="stock-table" className="w-full mt-4">
          <ReusableGrid rows={rows} colsDefs={colDefs} />
        </div>
      </div>

      {openStockAdd && (
        <GlobalModal
          open={openStockAdd}
          closeFunc={() => setOpenStockAdd((prev: boolean) => !prev)}
          children={
            <AddStockForm
              closeModal={() => setOpenStockAdd((prev: boolean) => !prev)}
            />
          }
        />
      )}

      {openInfoModal && (
        <GlobalModal
          open={openInfoModal}
          closeFunc={() => setOpenInfoModal((prev: boolean) => !prev)}
          children={
            <UpdateStockForm
              closeModal={() => setOpenInfoModal((prev: boolean) => !prev)}
              args={updatePayload}
            />
          }
        />
      )}
    </section>
  );
};
export default Stock;
