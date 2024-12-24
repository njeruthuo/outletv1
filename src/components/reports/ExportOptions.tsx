import { DownloadCSV, DownloadJSON } from "@/utils";
import { ReportType } from "@/pages/reports/types";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ExportOptions = ({ reportType }: { reportType: ReportType }) => {
  const state = useSelector((state: RootState) => state.reportReducer);

  const data = useMemo(() => {
    if (reportType == "Transactions") {
      return state.transactionTable;
    } else if (reportType == "Disbursements") {
      return state.disbursementTable;
    } else {
      return state.salesTable;
    }
  }, [reportType, state]);

  return (
    <div className="flex justify-center place-items-center">
      <div className={buttonStyles}>
        <img src="/file_json_24dp.svg" alt="" />
        <DownloadJSON data={data} fileName={`${reportType.toLowerCase()}`} />
      </div>

      <div className={buttonStyles}>
        <img src="/csv_24dp.svg" alt="" />
        <DownloadCSV data={data} fileName={`${reportType.toLowerCase()}`} />
      </div>
    </div>
  );
};

export default ExportOptions;

const buttonStyles =
  "border flex p-1 text-xs rounded-md bg-blue-500 text-white gap-1";
