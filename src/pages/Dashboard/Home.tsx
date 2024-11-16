import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  BarChartComponent,
  LineChartComponent,
  PieChartComponent,
} from "@/components/charts";

const Home = () => {
  return (
    <section className="w-full mt-4">
      <div className="product-availability">
        <Box sx={{ flexGrow: 1 }}>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div className="flex flex-col">
                  <PieChartComponent />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="flex flex-col">
                  <BarChartComponent />
                </div>
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
