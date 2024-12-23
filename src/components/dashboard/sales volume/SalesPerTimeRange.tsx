import { LineChartComponent } from "@/components/charts";
import { useGetTransactionLogsQuery } from "@/features/dashboard/dashboard";

const SalesPerTimeRange = () => {
  const { data: LogsCount } = useGetTransactionLogsQuery([]);

  return (
    <div className="flex flex-col">
      <LineChartComponent
        data={LogsCount}
        title="Sales rates"
        titleDescription="Realtime sales made per month"
        summaryHeader=""
        summaryDescription=""
        key={LogsCount}
      />
    </div>
  );
};

export default SalesPerTimeRange;
