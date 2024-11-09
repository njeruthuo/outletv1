import * as React from "react";
import Grid from "@mui/material/Grid2";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
import { StockProps } from "@/lib/types/stock/StockItemTypes";
import { useGetShopListQuery } from "@/features/sales/salesAPI";
import { GlobalCloseButton, GlobalSubmitButton } from "@/components/reusable";
import { ShopType } from "@/lib/types/sales/ShopType";
// import { CircularProgress } from "@mui/material";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles("dark", {
//     backgroundColor: "#1A2027",
//   }),
// }));

const UpdateStockForm: React.FC<StockProps> = ({ closeModal, args }) => {
  const { data: ShopList } = useGetShopListQuery([]);
  const [shopSelected, setShopSelected] = React.useState<string | undefined>();

  console.log(shopSelected, "shopSelected");

  function getCurrentStockQuantity() {
    if (shopSelected) {
      const currentShop = ShopList?.find(
        (shop: ShopType) => shop.branch_name === shopSelected
      );
      console.log(currentShop, "current_stock_quantity");
    }
  }

  function handleShopChange(e: React.ChangeEvent<{ value: string }>) {
    setShopSelected(e.target?.value);
  }

  getCurrentStockQuantity();

  return (
    <>
      <div>
        <h2 className="text-xl font-bold">Assign Stock item</h2>
        <div className="my-3.5" id="container">
          <Grid container spacing={2}>
            <Grid size={3}>
              <div>
                <h3 className="text-sm font-bold">Product Name</h3>
                <p>{args?.name}</p>
              </div>
            </Grid>
            <Grid size={3}>
              <div>
                <h3 className="text-sm font-bold">Quantity</h3>
                <p>{args?.quantity}</p>
              </div>
            </Grid>
            <Grid size={3}>
              <div>
                <h3 className="text-sm font-bold">Category</h3>
                <p>{args?.category}</p>
              </div>
            </Grid>
            <Grid size={3}>
              <div>
                <h3 className="text-sm font-bold">Last updated</h3>
                <p>
                  {args?.last_updated
                    ? new Date(args.last_updated).toDateString()
                    : "N/A"}
                </p>
              </div>
            </Grid>
            <Grid size={3}>
              <div>
                <h3 className="text-sm font-bold">Select Shop</h3>
                <div>
                  <Select onValueChange={handleShopChange}>
                    <SelectTrigger className="w-full my-1 outline-none z-[1500]">
                      <SelectValue placeholder="Select a Shop" />
                    </SelectTrigger>
                    <SelectContent className="z-[1400]">
                      <SelectGroup>
                        <SelectLabel>Our shops</SelectLabel>
                        {ShopList?.map((shop: ShopType) => (
                          <SelectItem
                            key={shop.branch_name}
                            value={shop.branch_name}
                          >
                            {shop.branch_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Grid>
            <Grid size={3}>
              <div>
                <h3 className="text-sm font-bold">Current Stock Quantity</h3>
                <p>{args?.name}</p>
              </div>
            </Grid>
            <Grid size={3}>
              <div>
                <h3 className="text-sm font-bold">Units to Disburse</h3>
                <p>{args?.name}</p>
              </div>
            </Grid>
            <Grid size={3}>
              <div>
                <h3 className="text-sm font-bold">Units Quantity</h3>
                <p>{args?.name}</p>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="flex justify-end gap-4 mt-2">
          <GlobalCloseButton closeModal={() => closeModal()}>
            <span>Close</span>
          </GlobalCloseButton>

          <GlobalSubmitButton>
            {/* {isLoading && <CircularProgress size="md" color="inherit" />} */}
            <span>Assign Stock</span>
          </GlobalSubmitButton>
        </div>
      </div>
    </>
  );
};
export default UpdateStockForm;
