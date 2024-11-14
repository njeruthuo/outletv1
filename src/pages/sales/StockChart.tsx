import { OrdersPerMonth } from "@/components/charts/orders/OrdersPerMonth";

const StockChart = () => {
  return (
    <section style={{ width: "668px", height: "375px" }}>
      <OrdersPerMonth />
    </section>
  );
};
export default StockChart;
