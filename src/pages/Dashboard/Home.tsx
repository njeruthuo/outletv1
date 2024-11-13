// import { StockManagement } from "@/components/charts/stock/StockManagement";
import { OrdersPerMonth } from "@/components/charts/orders/OrdersPerMonth";
import { ProductMoveRate } from "@/components/charts/customers/ProductTAT";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import React from "react";
// import { useSelector } from "react-redux";
// import { assetRedistributioncolors } from "./colors";
// import { selectAllCategories } from "@/features/stock/stockSlice";
// import DoughnutChart from "@/components/charts/stock/DoughnutChart/DoughnutChart";
import { StockManagement } from "@/components/charts/stock/StockManagement";

// type Category = {
//   id: number;
//   name: string;
//   amount: number;
//   fill: string;
// };

const Home = () => {
  // const categories = useSelector(selectAllCategories);

  // const totalCategories = React.useMemo(() => {
  //   return categories.reduce((acc, curr: Category) => acc + curr.amount, 0);
  // }, [categories]);

  return (
    <section className="w-full">
      <div className="product-availability">
        <Box sx={{ flexGrow: 1 }}>
          <div>
            <h3 className="font-bold text-xl my-2">Stock Management</h3>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div className="flex flex-col">
                  {/* <DoughnutChart
                    colors={assetRedistributioncolors}
                    data={categories}
                    text="Total"
                    totalCount={totalCategories}
                  /> */}
                  <StockManagement />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="flex flex-col">
                  {/* <h3 className="font-bold text-xl">Order Management</h3> */}
                  <OrdersPerMonth />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="flex flex-col">
                  {/* <h3 className="font-bold text-xl">Customer Management</h3> */}
                  <ProductMoveRate />
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
