import { Chip } from "@mui/material";
import { TooltipProps } from "recharts";

const ChartTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <Chip
        label={payload[0].name}
        size="small"
        variant="outlined"
        sx={{
          background: "white",
        }}
      />
    );
  }

  return null;
};

export default ChartTooltip;
