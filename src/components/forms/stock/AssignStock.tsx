import Grid from "@mui/material/Grid2";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { CircularProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { ShopType } from "@/lib/types/sales/ShopType";
import { useGetShopListQuery } from "@/features/sales/salesAPI";
import { useDisburseToShopMutation } from "@/features/stock/stockAPI";
import { StockItem, StockProps } from "@/lib/types/stock/StockItemTypes";
import { GlobalCloseButton, GlobalSubmitButton } from "@/components/reusable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UpdateStockForm: React.FC<StockProps> = ({ closeModal, args }) => {
  const { toast } = useToast();
  const { data: ShopList } = useGetShopListQuery([]);
  const [disburseToShop, isLoading] = useDisburseToShopMutation();
  const [shopSelected, setShopSelected] = useState<string>();
  const [currentQuantity, setCurrentQuantity] = useState<number>(0);
  const [disburseQuantity, setDisburseQuantity] = useState<number>(0);

  const assignObj = useMemo(() => {
    return {
      disburseQuantity: disburseQuantity,
      product_name: args?.name,
      shop: shopSelected,
    };
  }, [disburseQuantity, args?.name, shopSelected]);

  useEffect(() => {
    if (shopSelected) {
      const currentShop = ShopList?.find(
        (shop: ShopType) => shop.branch_name === shopSelected
      );

      const stockItem = currentShop?.stock?.find(
        (item: StockItem) => item.product.name === args?.name
      );

      setCurrentQuantity(stockItem?.quantity || 0);
    }
  }, [shopSelected, ShopList, args?.name]);

  const handleDisbursementQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = parseInt(e.target.value) || 0;
    const maxQuantity = args?.quantity || 0;

    if (input < 0) {
      setDisburseQuantity(0);
    } else if (input > maxQuantity) {
      setDisburseQuantity(maxQuantity);
    } else {
      setDisburseQuantity(input);
    }
  };

  async function handleDisburseToShop() {
    try {
      const response = await disburseToShop({ ...assignObj });
      toast({
        variant: "default",
        title: "Success",
        description: "The disbursement was successful",
      });
      closeModal();
      return response;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Occurred",
        description: "There was an error disbursing the stock",
      });
      return error;
    }
  }

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
                  <Select
                    onValueChange={(value: string) => {
                      setShopSelected(value);
                    }}
                  >
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
                <h3 className="text-sm font-bold">Quantity to Disburse</h3>
                <div className="mt-1">
                  <Input
                    min={0}
                    max={args?.quantity || 0}
                    type="number"
                    onChange={handleDisbursementQuantityChange}
                    value={disburseQuantity}
                  />
                </div>
              </div>
            </Grid>
            <Grid size={3}>
              <div>
                <h3 className="text-sm font-bold">Initial Quantity</h3>
                <div className="mt-1">
                  <Input value={currentQuantity} readOnly />
                </div>
              </div>
            </Grid>
            <Grid size={3}>
              <div>
                <h3 className="text-sm font-bold">Stock Quantity</h3>
                <div className="mt-1">
                  <Input
                    value={
                      disburseQuantity
                        ? (currentQuantity || 0) + disburseQuantity
                        : currentQuantity
                    }
                    readOnly
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="flex justify-end gap-4 mt-2">
          <GlobalCloseButton closeModal={() => closeModal()}>
            <span>Close</span>
          </GlobalCloseButton>

          <GlobalSubmitButton handleSubmit={handleDisburseToShop}>
            {!isLoading && <CircularProgress size="md" color="inherit" />}
            <span>Disburse Stock</span>
          </GlobalSubmitButton>
        </div>
      </div>
    </>
  );
};
export default UpdateStockForm;
