import { BarChartComponent } from "@/components/charts";
import { useGetStockItemsQuery } from "@/features/stock/stockAPI";
import { StockItem } from "@/lib/types/stock/StockItemTypes";

const StockLevels = () => {
  const { data: StockItems } = useGetStockItemsQuery([]);

  const prop_data = StockItems?.map((item: StockItem) => {
    return { label: item.product.name, value: item.quantity };
  });
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <BarChartComponent
          title="Rapid Rack Stock levels"
          titleDescription="An overview of our stock and balances"
          // summaryDescription="Restock required for several products"
          // summaryHeader="Declining by 20% each day"
          data={prop_data}
          key={"Stock level"}
        />
      </div>
    </div>
  );
};

export default StockLevels;
