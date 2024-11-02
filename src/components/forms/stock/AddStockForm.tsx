import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { AddFormSchema } from "@/lib/types/stock/AddFormSchema";
import { useAddStockMutation } from "@/features/stock/stockAPI";
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
import { StockProps } from "@/lib/types/stock/StockItemTypes";
import { useGetCategoryQuery } from "@/features/stock/categoryAPI";
import { useGetBrandQuery } from "@/features/stock/brandAPI";
// import { useMemo } from "react";

const AddStockForm: React.FC<StockProps> = ({ closeModal }) => {
  const { toast } = useToast();
  const [addStock, { isLoading }] = useAddStockMutation();

  // Fetch Category and Brand information to use when adding new Stock products
  const { data: CategoryList } = useGetCategoryQuery([]);
  const { data: BrandList } = useGetBrandQuery([]);

  console.log(CategoryList, "categories");
  console.log(BrandList, "brands");

  // 1. Define your form.
  const form = useForm<z.infer<typeof AddFormSchema>>({
    resolver: zodResolver(AddFormSchema),
    defaultValues: {
      name: "",
      price_per_item: "",
      category: "",
      brand: "",
      quantity: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AddFormSchema>) {
    try {
      await addStock(values).unwrap();
      closeModal();
      toast({
        variant: "default",
        title: "Success",
        description: "Product Added successfully",
      });
    } catch (error) {
      closeModal();
      toast({
        variant: "destructive",
        title: "Failed",
        description:
          "An error occurred while adding stock item. Please try again!",
      });
      console.log("Failed to add stock:", error);
    }
  }

  return (
    <>
      <Form {...form}>
        <h2 className="text-xl font-bold my-1">Add Stock</h2>
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
                    <Input
                      id="price_per_item"
                      placeholder="e.g 200"
                      {...field}
                    />
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
                        {CategoryList?.map(
                          (
                            categoryList: { name: string; id: number },
                            index: number
                          ) => {
                            return (
                              <SelectItem key={index} value={categoryList.name}>
                                {categoryList.name}
                              </SelectItem>
                            );
                          }
                        )}
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                      <SelectContent className="z-[1400]">
                        {BrandList?.map(
                          (
                            brandList: { name: string; id: number },
                            index: number
                          ) => {
                            return (
                              <SelectItem key={index} value={brandList.name}>
                                {brandList.name}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button
              className="bg-custom2 hover:bg-custom2 mr-auto"
              onClick={() => closeModal()}
            >
              <span>Close</span>
            </Button>
            <Button className="bg-custom1 hover:bg-customPale" type="submit">
              {isLoading && <CircularProgress size="md" color="inherit" />}
              <span>Add Stock</span>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
export default AddStockForm;
