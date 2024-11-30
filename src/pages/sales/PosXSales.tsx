import Sales from "./Sales";
import { useSelector } from "react-redux";
import SalesPage from "./point-of-sale/SalesPage";
import { RootState } from "@/store/store";

const PosXSales = () => {
  const state = useSelector((state: RootState) => state?.auth);
  return (
    <>
      {state.access_level == "Employee" ? (
        <SalesPage />
      ) : (
        <div>
          {state.salesMode ? (
            <>
              <SalesPage />
            </>
          ) : (
            <>
              <Sales />
            </>
          )}
        </div>
      )}
    </>
  );
};
export default PosXSales;
