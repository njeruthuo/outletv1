import { useMemo } from "react";
import { PieChartComponent } from "@/components/charts";
import { useGetStockDisbursementsQuery } from "@/features/dashboard/dashboard";

const StockDisbursement = () => {
  const {
    data: StockDisbursements,
    isLoading,
    isError,
  } = useGetStockDisbursementsQuery([]);

  const prop_data = useMemo(() => {
    return [
      {
        label: "Completed",
        value: StockDisbursements?.completed,
        color: "#0088FE",
      },
      {
        label: "Pending",
        value: StockDisbursements?.pending,
        color: "#00C49F",
      },
    ];
  }, [StockDisbursements]);

  if (isLoading) {
    return <div>Loading stock disbursements...</div>;
  }

  if (isError) {
    return (
      <div>Failed to load stock disbursements. Please try again later.</div>
    );
  }

  if (!StockDisbursements || StockDisbursements.length === 0) {
    return <div>No stock disbursements available.</div>;
  }

  return (
    <div>
      <PieChartComponent
        data={prop_data}
        centerLabel="disbursements"
        title="Stock disbursements status"
        titleDescription="Pending vs completed shop Disbursements"
        // summaryHeader="Disbursements to shops are growing by 28% monthly"
        // summaryDescription="Follow up with Logistics to determine why there is lag in delivery"
        key={"Pending vs Completed shop disbursements"}
      />
    </div>
  );
};

export default StockDisbursement;
