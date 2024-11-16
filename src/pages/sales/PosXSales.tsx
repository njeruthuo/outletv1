import { State } from ".";
import Sales from "./Sales";
import { useSelector } from "react-redux";
import SalesPage from "./point-of-sale/SalesPage";

const PosXSales = () => {
  const salesMode = useSelector((state: State) => state?.auth?.salesMode);
  return (
    <div>
      {salesMode ? (
        <>
          <SalesPage />
        </>
      ) : (
        <>
          <Sales />
        </>
      )}
    </div>
  );
};
export default PosXSales;
