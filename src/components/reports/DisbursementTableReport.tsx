import { useGetDisbursementReportsQuery } from "@/features/reports/reportApi";
import { ReusableGrid } from "../reusable";
import { DisbursementTypes } from "@/pages/reports/types";
import { useMemo } from "react";

const DisbursementsTable = () => {
  const { data: Disbursements } =
    useGetDisbursementReportsQuery("Disbursements");

  const rowsData = useMemo(() => {
    if (Disbursements) {
      return Disbursements.map((disbursement) => ({
        disbursed_by: disbursement.disbursed_by,
        product: disbursement.product.name,
        shop: disbursement.shop.branch_name,
        disbursement_quantity: disbursement.disburse_quantity,
        timestamp: disbursement.timestamp,
        status: disbursement.status,
      }));
    }
    return [];
  }, [Disbursements]);
  return (
    <>
      <ReusableGrid colsDefs={DisbursementTypes} rows={rowsData} />
    </>
  );
};

export default DisbursementsTable;
