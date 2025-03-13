import { cn } from "@/lib/utils";
import { AgGridReact } from "ag-grid-react";
import { ColDef, RowClickedEvent } from "ag-grid-community";



interface ReusableTableProps {
  rows: unknown[];
  colsDefs: ColDef[];
  onRowClick?: (event: RowClickedEvent) => void;
}

const ReusableGrid: React.FC<ReusableTableProps> = ({
  rows,
  colsDefs,
  onRowClick,
}) => {
  return (
    <div className={cn("ag-theme-quartz", "w-full h-[80vh]")}>
      <AgGridReact
        rowData={rows}
        columnDefs={colsDefs}
        onRowClicked={onRowClick}
      />
    </div>
  );
};

export default ReusableGrid;
