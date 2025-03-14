import { Button } from "@mui/material";
import { formatDate } from "@/utils/date";
import AddIcon from "@mui/icons-material/Add";
import { AddStockForm } from "@/components/forms";
import { useEffect, useMemo, useState } from "react";
import { ICellRendererParams } from "ag-grid-community";
import { SearchContext } from "@/lib/types/SearchTypes";
import ManageStock from "@/components/forms/stock/ManageStock";
import DeleteAction from "@/components/forms/stock/DeleteAction";
import { FilterByBrand, FilterByCategory } from "@/components/custom";
import { Search, GlobalModal, ReusableGrid } from "@/components/reusable";
import {
  useDeleteStockMutation,
  useGetStockItemsQuery,
} from "@/features/stock/stockAPI";
import {
  filterType,
  StockColumn,
  StockItem,
  StockRow,
} from "@/lib/types/stock/StockItemTypes";

const Stock = () => {
  const [data, setData] = useState([]);
  const [searchedStock, setSearchedStock] = useState([]);
  const { data: stockItems } = useGetStockItemsQuery([]);
  const [openStockAdd, setOpenStockAdd] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [updatePayload, setUpdatePayload] = useState<StockRow>();
  const [filter, setFilter] = useState<filterType>({
    filterBrand: "",
    filterCategory: "",
  });

  useEffect(() => {
    if (searchedStock.length > 0) {
      if (filter.filterBrand || filter.filterCategory) {
        const filteredData = searchedStock.filter((stockItem: StockItem) => {
          return (
            stockItem.product.category.name == filter.filterCategory ||
            stockItem.product.brand.name == filter.filterBrand
          );
        });
        setData(filteredData);
      } else {
        setData(searchedStock);
      }
    } else if (stockItems) {
      if (filter.filterBrand || filter.filterCategory) {
        const filteredData = stockItems.filter((stockItem: StockItem) => {
          return (
            stockItem.product.category.name == filter.filterCategory ||
            stockItem.product.brand.name == filter.filterBrand
          );
        });
        setData(filteredData);
      } else {
        setData(stockItems);
      }
    }
  }, [stockItems, searchedStock, filter.filterBrand, filter.filterCategory]);

  const CustomInfoButtonComponent = (props: ICellRendererParams) => {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      cellRenderer: CustomInfoButtonComponent,
    },
    {
      field: "delete",
      flex: 0.5,
      headerName: "",
      cellRenderer: CustomDeleteButtonComponent,
    },
  ]);

  console.log(setColDefs, "setColDefs");

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

  function stockAddModalOpener() {
    setOpenStockAdd((prev: boolean) => !prev);
  }

  function infoModalOpener(props: ICellRendererParams) {
    setUpdatePayload(props.data);
    setOpenInfoModal((prev: boolean) => !prev);
  }

  return (
    <section className="flex w-full ">
      <div className="w-full">
        <div className="flex justify-end w-full space-x-4 place-items-center">
          <div className="mr-auto">
            <p className="text-2xl font-bold">Stock Management</p>
          </div>

          <div id="filter" className="flex gap-2">
            <FilterByCategory func={setFilter} />
            <FilterByBrand func={setFilter} />
          </div>

          <Search context={SearchContext.Products} setFunc={setSearchedStock} />

          <Button
            variant="contained"
            color="info"
            className="p-1 flex place-items-center"
            onClick={stockAddModalOpener}
          >
            <AddIcon />
            <span className="p-1">stock</span>
          </Button>
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
            <ManageStock
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
