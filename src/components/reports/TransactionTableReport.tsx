import { ReusableGrid } from "@/components/reusable";
import { TransactionColDefs } from "../../pages/reports/types";
import { useGetTransactionsReportsQuery } from "@/features/reports/reportApi";
import { useMemo } from "react";

const TransactionReportTable = () => {
  const { data: TransactionReport } =
    useGetTransactionsReportsQuery("Transactions");

  const rowData = useMemo(() => {
    if (TransactionReport) {
      return TransactionReport?.map((transaction) => ({
        shop: transaction.shop.branch_name,
        customer_number: transaction.customer_number,
        transaction_type: transaction.transaction_type,
        transaction_status: transaction.transaction_status,
        receipt_ID: transaction.receipt_ID,
        profit: transaction.transaction_type,
        mpesa_transaction_code: transaction.mpesa_transaction_code,
        date_created: transaction.date_created,
      }));
    }
    return [];
  }, [TransactionReport]);

  return (
    <>
      <ReusableGrid rows={rowData} colsDefs={TransactionColDefs} />
    </>
  );
};

export default TransactionReportTable;
