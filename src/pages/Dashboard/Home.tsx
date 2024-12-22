import { Box, Grid } from "@mui/material";
import {
  SalesPerTimeRange,
  StockDisbursement,
  StockLevels,
} from "@/components/dashboard";

const Home = () => {
  return (
    <section className="w-full mt-4">
      <div className="product-availability">
        <Box sx={{ flexGrow: 1 }}>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <StockLevels />
              </Grid>
              <Grid item xs={4}>
                <StockDisbursement />
              </Grid>
              <Grid item xs={4}>
                <SalesPerTimeRange />
              </Grid>
            </Grid>
          </div>
        </Box>
      </div>
    </section>
  );
};

export default Home;
