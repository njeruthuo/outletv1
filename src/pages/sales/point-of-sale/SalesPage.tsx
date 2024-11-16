import CounterTop from "./CounterTop";
import ProductList from "./ProductList";

const SalesPage = () => {
  return (
    <section className="flex w-full">
      <div className="w-1/2">
        <CounterTop />
      </div>
      <div className="w-1/2">
        <ProductList />
      </div>
    </section>
  );
};
export default SalesPage;
