import {
  SalesPerTimeRange,
  StockDisbursement,
  StockLevels,
} from "@/components/dashboard";

const Home = () => {
  return (
    <section className="w-full mt-4">
      <div className={containerStyles}>
        <StockLevels />
        <StockDisbursement />
        <SalesPerTimeRange />
      </div>
    </section>
  );
};

export default Home;
const containerStyles = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
