import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// import { ICellRendererParams } from "ag-grid-community";

import { zodResolver } from "@hookform/resolvers/zod";
import { AddFormSchema } from "@/lib/types/AddFormSchema";
import { useUpdateStockMutation } from "@/features/stock/stockAPI";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircularProgress } from "@mui/material";
import { StockProps } from "@/lib/types/StockItemTypes";
import { useEffect, useState } from "react";
import DeleteAction from "./DeleteAction";

const UpdateStockForm: React.FC<StockProps> = ({ closeModal, args }) => {
  const { toast } = useToast();
  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);
  const [updateStock, { isLoading }] = useUpdateStockMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  console.log(args, "args");
  // 1. Define your form.
  const form = useForm<z.infer<typeof AddFormSchema>>({
    resolver: zodResolver(AddFormSchema),
    defaultValues: {
      name: args?.name || "",
      price_per_item: args?.price.toString() || "",
      category: args?.category || "",
      brand: args?.brand || "",
      quantity: args?.quantity.toString() || "",
    },
  });

  useEffect(() => {
    if (args) {
      form.reset({
        name: args.name,
        price_per_item: args.price.toString(),
        category: args.category,
        brand: args.brand,
        quantity: args.quantity.toString(),
      });
    }
  }, [args, form]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AddFormSchema>) {
    try {
      await updateStock({ ...values, id: args?.id }).unwrap();
      closeModal();
      toast({
        variant: "default",
        title: "Success",
        description: "Product Modified successfully!",
      });
    } catch (error) {
      closeModal();
      toast({
        variant: "destructive",
        title: "Failed",
        description: "An error occurred while updating the stock item!",
      });
      console.log("Failed to add stock:", error);
    }
  }

  return (
    <Form {...form}>
      <h2 className="text-xl font-bold my-1">Update Stock item</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Maize flour...." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price_per_item"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per unit</FormLabel>
                <FormControl>
                  <Input id="price_per_item" placeholder="e.g 200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total number of products</FormLabel>
                <FormControl>
                  <Input
                    id="quantity"
                    placeholder="4500 bales"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="z-[1400]">
                      <SelectItem value="DRYFOODS">DRY FOODS</SelectItem>
                      <SelectItem value="TOILETRIES">TOILETRIES</SelectItem>
                      <SelectItem value="CLEANING AGENTS">
                        CLEANING AGENTS
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input
                    id="brand"
                    placeholder="e.g Jogoo"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            className="bg-custom2 hover:bg-custom2 mr-auto"
            onClick={() => closeModal()}
          >
            <span>Close</span>
          </Button>
          <Button className="bg-danger hover:bg-dangerPale">
            {isLoading && <CircularProgress size="md" color="inherit" />}
            <span>Delete Stock</span>
          </Button>
          <Button className="bg-custom1 hover:bg-customPale" type="submit">
            {isLoading && <CircularProgress size="md" color="inherit" />}
            <span>Modify Stock</span>
          </Button>
        </div>
        <DeleteAction isOpen={isDeleteDialogOpen} onClose={closeDeleteDialog} />
      </form>
    </Form>
  );
};
export default UpdateStockForm;
