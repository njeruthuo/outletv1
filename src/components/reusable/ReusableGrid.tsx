import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useState } from "react";
import { cn } from "@/lib/utils";

const ReusableGrid = ({ rows }) => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "name", flex: 1 },
    { field: "price", flex: 1 },
    { field: "category", flex: 1 },
    { field: "brand", flex: 1 },
    { field: "last_updated", flex: 1 },
  ]);

  return (
    // wrapping container with theme & size
    <div
      className={cn("ag-theme-quartz", "w-full")} // applying the Data Grid theme
      style={{ height: 500, width: "100%" }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact rowData={rows} columnDefs={colDefs} />
    </div>
  );
};
export default ReusableGrid;
