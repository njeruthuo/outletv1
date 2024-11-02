import { useMemo, useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useGetShopListQuery } from "@/features/sales/salesAPI";
import { ShopColumn, ShopType } from "@/lib/types/sales/ShopType";
import { formatDate } from "@/utils/date";
import { GlobalModal, ReusableGrid } from "@/components/reusable";
import { ICellRendererParams } from "ag-grid-community";
import AddShopForm from "@/components/forms/sales/AddShopForm";

const Sales = () => {
  const { data: ShopList } = useGetShopListQuery([]);
  const [openAddShopModal, setOpenAddShopModal] = useState(false);

  const ShopDetailsInfoButton = (params: ICellRendererParams) => {
    console.log(params, "params");
    function handleIconClick() {
      // setOpenAddShopModal((prev: boolean) => !prev);
      console.log(`Info Button Clicked with: ${params}`);
    }

    return (
      <div
        className="flex h-full justify-center items-center"
        onClick={handleIconClick}
      >
        <img src="/info.svg" />
      </div>
    );
  };

  console.log(ShopList, "shopList");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [colDefs, setColDefs] = useState<ShopColumn[]>([
    { field: "branch_name", flex: 1, headerName: "Branch Name" },
    { field: "location", flex: 1 },
    { field: "opening_date", flex: 1, headerName: "Opening Date" },
    { field: "avg_weekly_profit", flex: 1, headerName: "Avg Weekly Profit" },
    { field: "licenses", flex: 1, headerName: "Licenses" },
    { field: "weight_tat", flex: 1, headerName: "AVG Turn Around Time" },
    {
      field: "info",
      flex: 0.5,
      headerName: "",
      cellRenderer: ShopDetailsInfoButton,
    },
  ]);

  const rows = useMemo(() => {
    return ShopList?.map((item: ShopType) => ({
      id: item.id,
      branch_name: item.branch_name,
      location: item.location,
      weight_tat: item.weight_tat,
      opening_date: formatDate(item.opening_date),
      licenses: item.licenses,
      avg_weekly_profit: item.avg_weekly_profit,
    }));
  }, [ShopList]);

  return (
    <section className="flex w-full ">
      <div className="w-full">
        <div className="flex justify-end w-full space-x-4 place-items-center">
          <div className="mr-auto">
            <p className="text-2xl font-bold">Sales Management</p>
          </div>

          {/* <Search context={SearchContext.Products} setFunc={setSearchedStock} /> */}

          <Button
            variant="contained"
            color="info"
            className="p-1 flex place-items-center"
            onClick={() => setOpenAddShopModal((prev: boolean) => !prev)}
          >
            <AddIcon />
            <span className="p-1">Shop</span>
          </Button>

          {/* <div className="hover:cursor-pointer flex p-2 bg-customPale rounded-full">
            <AddPrompt />
          </div> */}
        </div>
        <div id="stock-table" className="w-full mt-4">
          <ReusableGrid rows={rows} colsDefs={colDefs} />
        </div>
      </div>
      {openAddShopModal && (
        <GlobalModal
          open={openAddShopModal}
          closeFunc={() => setOpenAddShopModal((prev: boolean) => !prev)}
          children={
            <AddShopForm
              closeModal={() => setOpenAddShopModal((prev: boolean) => !prev)}
            />
          }
        />
      )}
    </section>
  );
};
export default Sales;
