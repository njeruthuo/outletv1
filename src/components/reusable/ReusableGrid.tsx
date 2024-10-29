import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { cn } from "@/lib/utils";

const ReusableGrid = ({ rows, colsDefs }) => {
  // Column Definitions: Defines the columns to be displayed.

  return (
    // wrapping container with theme & size
    <div
      className={cn("ag-theme-quartz", "w-full")} // applying the Data Grid theme
      style={{ height: 500, width: "100%" }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact rowData={rows} columnDefs={colsDefs} />
    </div>
  );
};
export default ReusableGrid;
