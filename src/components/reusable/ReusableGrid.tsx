import { cn } from "@/lib/utils";
import { ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component

interface ReusableTableProps {
  rows: unknown;
  colsDefs: unknown;
  onRowClick?: unknown;
}

const ReusableGrid: React.FC<ReusableTableProps> = ({
  rows,
  colsDefs,
  onRowClick,
}) => {
  // Column Definitions: Defines the columns to be displayed.

  return (
    // wrapping container with theme & size
    <div
      className={cn("ag-theme-quartz", "w-full h-[80vh]")} // applying the Data Grid theme
      // style={{ height: 800, width: "100%" }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rows}
        columnDefs={colsDefs}
        onRowClicked={onRowClick}
      />
    </div>
  );
};
export default ReusableGrid;
