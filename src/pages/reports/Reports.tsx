import { ReportType } from "./types";
import { useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DisbursementsTable,
  SalesTableReport,
  TransactionReportTable,
} from "@/components/reports";
import GlobalPopOver from "@/components/reusable/GlobalPopOver";
import ExportOptions from "@/components/reports/ExportOptions";

const Reports = () => {
  const [reportType, setReportType] = useState<ReportType>("Transactions");

  function handleSelectChange(value: string) {
    setReportType(value as ReportType);
  }

  const showTables = useMemo(() => {
    if (reportType == "Transactions") {
      return <TransactionReportTable />;
    } else if (reportType == "Disbursements") {
      return <DisbursementsTable />;
    } else {
      return <SalesTableReport />;
    }
  }, [reportType]);

  function SelectReport() {
    return (
      <>
        <div className="my-2">
          <Select onValueChange={handleSelectChange} value={reportType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Transactions">Transactions</SelectItem>
              <SelectItem value="Disbursements">Disbursements</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="flex place-items-center">
        {SelectReport()}
        <div className="flex ml-auto. ml-1 border p-1 px-2 rounded hover:cursor-pointer">
          <GlobalPopOver
            trigger={<img src="/file_export_24dp.svg" alt="" />}
            children={<ExportOptions reportType={reportType} />}
          />
          <h2>Export</h2>
        </div>
      </div>
      {showTables}
    </div>
  );
};
export default Reports;
