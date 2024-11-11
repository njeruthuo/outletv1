import { Button } from "@mui/material";
import { formatDate } from "@/utils/date";
import { useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ShopInfo from "@/components/custom/ShopInfo";
import { AddEmployeeForm } from "@/components/forms";
import { ICellRendererParams } from "ag-grid-community";
import AddShopForm from "@/components/forms/sales/AddShopForm";
import { GlobalModal, ReusableGrid } from "@/components/reusable";
import { useGetShopListQuery } from "@/features/sales/salesAPI";
import { ShopColumn, ShopType } from "@/lib/types/sales/ShopType";

const Sales = () => {
  const { data: ShopList } = useGetShopListQuery([]);
  const [openAddShopModal, setOpenAddShopModal] = useState<boolean>(false);
  const [openAddUser, setOpenAddUser] = useState<boolean>(false);

  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
  const [infoModalData, setInfoModalData] = useState([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [colDefs, setColDefs] = useState<ShopColumn[]>([
    { field: "branch_name", flex: 1, headerName: "Branch Name" },
    { field: "location", flex: 1 },
    { field: "opening_date", flex: 1, headerName: "Opening Date" },
    { field: "avg_weekly_profit", flex: 1, headerName: "Avg Weekly Profit" },
    { field: "weight_tat", flex: 1, headerName: "AVG Turn Around Time" },
  ]);

  const rows = useMemo(() => {
    return ShopList?.map((item: ShopType) => ({
      id: item.id,
      branch_name: item.branch_name,
      location: item.location,
      weight_tat: item.weight_tat,
      opening_date: formatDate(item.opening_date),
      avg_weekly_profit: item.avg_weekly_profit,
    }));
  }, [ShopList]);

  const onRowClick = (params: ICellRendererParams) => {
    setOpenInfoModal((prev: boolean) => !prev);
    setInfoModalData(params.data);
  };

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
            color="warning"
            className="p-1 flex place-items-center"
            onClick={() => setOpenAddUser((prev: boolean) => !prev)}
          >
            <AddIcon />
            <span className="p-1">employee</span>
          </Button>

          <Button
            variant="contained"
            color="info"
            className="p-1 flex place-items-center"
            onClick={() => setOpenAddShopModal((prev: boolean) => !prev)}
          >
            <AddIcon />
            <span className="p-1">Shop</span>
          </Button>
        </div>
        <div id="stock-table" className="w-full mt-4">
          <ReusableGrid
            rows={rows}
            colsDefs={colDefs}
            onRowClick={onRowClick}
          />
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

      {openInfoModal && (
        <GlobalModal
          open={openInfoModal}
          closeFunc={() => setOpenInfoModal((prev: boolean) => !prev)}
          children={
            <ShopInfo
              infoModalData={infoModalData}
              closeModal={() => setOpenInfoModal((prev: boolean) => !prev)}
            />
          }
        />
      )}

      {openAddUser && (
        <GlobalModal
          open={openAddUser}
          closeFunc={() => setOpenAddUser((prev: boolean) => !prev)}
          children={
            <AddEmployeeForm
              closeModal={() => setOpenAddUser((prev: boolean) => !prev)}
            />
          }
        />
      )}
    </section>
  );
};
export default Sales;
