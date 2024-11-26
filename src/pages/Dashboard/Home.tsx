import { useGetStockItemsQuery } from "@/features/stock/stockAPI";
import { useGetShopListQuery } from "@/features/sales/salesAPI";
import { StockItem } from "@/lib/types/stock/StockItemTypes";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import { RootState } from "@/store/store";
import {
  BarChartComponent,
  LineChartComponent,
  PieChartComponent,
} from "@/components/charts";
import { useMemo } from "react";

const Home = () => {
  const user_level = useSelector((state: RootState) => state.auth.access_level);
  const { data: StockItems } = useGetStockItemsQuery([]);
  const { data: ShopList } = useGetShopListQuery([]);

  const prop_data = useMemo(() => {
    if (user_level == "Admin") {
      return StockItems?.map((item: StockItem) => {
        return { label: item.product.name, value: item.quantity };
      });
    }

    if (user_level == "Employee") {
      return ShopList?.map((item: StockItem) => {
        return { label: item.product.name, value: item.quantity };
      });
    }

    if (user_level == "Manager") {
      // Handle the manager's logic properly here...
      return ShopList?.map((item: StockItem) => {
        return { label: item.product.name, value: item.quantity };
      });
    }
  }, [user_level, ShopList, StockItems]);

  return (
    <section className="w-full mt-4">
      <div className="product-availability">
        <Box sx={{ flexGrow: 1 }}>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <BarChartComponent
                      title="Rapid Rack Stock levels"
                      titleDescription="An overview of our stock and balances"
                      summaryDescription="Restock required for several products"
                      summaryHeader="Declining by 20% each day"
                      data={prop_data}
                      key={"Stock level"}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <PieChartComponent
                  data={prop_data}
                  centerLabel="disbursements"
                  title="Stock disbursements status"
                  titleDescription="Pending vs completed shop Disbursements"
                  summaryHeader="Disbursements to shops are growing by 28% monthly"
                  summaryDescription="Follow up with Logistics to determine why there is lag in delivery"
                  key={"Pending vs Completed shop disbursements"}
                />
              </Grid>
              <Grid item xs={4}>
                <div className="flex flex-col">
                  <LineChartComponent />
                </div>
              </Grid>
            </Grid>
          </div>
        </Box>
      </div>
    </section>
  );
};

export default Home;
