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

  return (
    <div>
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
      {showTables}
    </div>
  );
};
export default Reports;
