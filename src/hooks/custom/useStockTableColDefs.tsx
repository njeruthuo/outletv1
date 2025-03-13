import { useState } from "react";
import { StockColumn } from "@/lib/types/stock/StockItemTypes";

type useStockTableColDefsPropType = {
  CustomButtonComponent: (params: unknown) => JSX.Element;
};

const useStockTableColDefs = ({
  CustomButtonComponent,
}: useStockTableColDefsPropType) => {
  const [colDefs, setColDefs] = useState<StockColumn[]>([
    { field: "name", flex: 1, headerName: "Product Name" },
    { field: "price", flex: 1, headerName: "Price per unit" },
    { field: "category", flex: 1 },
    { field: "brand", flex: 1 },
    { field: "last_updated", flex: 1, headerName: "Last Updated" },
    { field: "quantity", flex: 1 },
    {
      field: "info",
      flex: 1,
      headerName: "",
      cellRenderer: CustomButtonComponent, // Note the change here
    },
  ]);
  return { colDefs, setColDefs };
};

export default useStockTableColDefs;
