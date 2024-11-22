import { BarChartComponent } from "@/components/charts";
import { StockItem } from "@/lib/types/stock/StockItemTypes";

/**
 * I might need to add a few things like Footer notes to tell more info.
 */

interface StockChartProps {
  stock: StockItem[];
}

const StockChart: React.FC<StockChartProps> = ({ stock }) => {
  const prop_data = stock.map((item) => {
    return { label: item.product.name, value: item.quantity };
  });

  return (
    <section style={{ width: "668px", height: "375px" }}>
      <BarChartComponent
        title="Stock levels"
        titleDescription="An overview of our stock"
        summaryDescription=""
        summaryHeader=""
        data={prop_data}
        key={"Stock level"}
      />
    </section>
  );
};
export default StockChart;
