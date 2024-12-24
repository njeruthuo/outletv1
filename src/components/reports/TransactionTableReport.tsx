import { ReusableGrid } from "@/components/reusable";
import { TransactionColDefs } from "../../pages/reports/types";
import { useGetTransactionsReportsQuery } from "@/features/reports/reportApi";
import { useEffect, useMemo } from "react";

import { useDispatch } from "react-redux";
import { populateTransactionTable } from "@/features/reports/reportSlice";

const TransactionReportTable = () => {
  const dispatch = useDispatch();
  const { data: TransactionReport } =
    useGetTransactionsReportsQuery("Transactions");

  const rowData = useMemo(() => {
    if (TransactionReport) {
      const report = TransactionReport?.map((transaction) => ({
        shop: transaction.shop.branch_name,
        customer_number: transaction.customer_number,
        transaction_type: transaction.transaction_type,
        transaction_status: transaction.transaction_status,
        receipt_ID: transaction.receipt_ID,
        profit: transaction.profit,
        mpesa_transaction_code: transaction.mpesa_transaction_code,
        date_created: transaction.date_created,
      }));

      return report;
    }
    return [];
  }, [TransactionReport]);

  useEffect(() => {
    if (rowData.length > 0) {
      dispatch(populateTransactionTable(rowData));
    }
  }, [rowData, dispatch]);

  return (
    <>
      <ReusableGrid rows={rowData} colsDefs={TransactionColDefs} />
    </>
  );
};

export default TransactionReportTable;
