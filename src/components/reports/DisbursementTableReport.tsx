import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { ReusableGrid } from "../reusable";
import { DisbursementTypes } from "@/pages/reports/types";
import { populateDisbursementTable } from "@/features/reports/reportSlice";
import { useGetDisbursementReportsQuery } from "@/features/reports/reportApi";

const DisbursementsTable = () => {
  const dispatch = useDispatch();
  const { data: Disbursements } =
    useGetDisbursementReportsQuery("Disbursements");

  const rowsData = useMemo(() => {
    if (Disbursements) {
      const report = Disbursements.map((disbursement) => ({
        disbursed_by: disbursement.disbursed_by,
        product: disbursement.product.name,
        shop: disbursement.shop.branch_name,
        disbursement_quantity: disbursement.disburse_quantity,
        timestamp: disbursement.timestamp,
        status: disbursement.status,
      }));

      return report;
    }
    return [];
  }, [Disbursements]);

  useEffect(() => {
    if (rowsData.length > 0) {
      dispatch(populateDisbursementTable(rowsData));
    }
  }, [rowsData, dispatch]);

  return (
    <>
      {rowsData && DisbursementTypes && (
        <ReusableGrid colsDefs={DisbursementTypes} rows={rowsData} />
      )}
    </>
  );
};

export default DisbursementsTable;
