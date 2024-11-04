import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// import { ICellRendererParams } from "ag-grid-community";

import { zodResolver } from "@hookform/resolvers/zod";
import { AddFormSchema } from "@/lib/types/stock/AddFormSchema";
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
import { StockProps } from "@/lib/types/stock/StockItemTypes";
import { useEffect, useState } from "react";
import { useGetCategoryQuery } from "@/features/stock/categoryAPI";
import { useGetBrandQuery } from "@/features/stock/brandAPI";
import { Separator } from "@/components/ui/separator";

type TabType = "Update" | "Assign" | "";

const UpdateStockForm: React.FC<StockProps> = ({ closeModal, args }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>("Update");
  const [updateStock, { isLoading }] = useUpdateStockMutation();

  const { data: CategoryList } = useGetCategoryQuery([]);
  const { data: BrandList } = useGetBrandQuery([]);

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

  const handleSelectTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    setActiveTab(id);
  };

  const displayContentTabs = () => {
    if (activeTab == "Update") {
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
                      <Input
                        id="name"
                        placeholder="Maize flour...."
                        {...field}
                      />
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                                <SelectItem
                                  key={index}
                                  value={categoryList.name}
                                >
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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

            <div className="flex justify-end gap-4">
              <Button
                className="bg-custom2 hover:bg-custom2 mr-auto"
                onClick={() => closeModal()}
              >
                <span>Close</span>
              </Button>

              <Button className="bg-custom1 hover:bg-customPale" type="submit">
                {isLoading && <CircularProgress size="md" color="inherit" />}
                <span>Modify Stock</span>
              </Button>
            </div>
          </form>
        </Form>
      );
    } else if (activeTab == "Assign") {
      return (
        <Form {...form}>
          <h2 className="text-xl font-bold my-1">Assign Stock item</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Maize flour...."
                        {...field}
                      />
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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
                                <SelectItem
                                  key={index}
                                  value={categoryList.name}
                                >
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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

            <div className="flex justify-end gap-4">
              <Button
                className="bg-custom2 hover:bg-custom2 mr-auto"
                onClick={() => closeModal()}
              >
                <span>Close</span>
              </Button>

              <Button className="bg-custom1 hover:bg-customPale" type="submit">
                {isLoading && <CircularProgress size="md" color="inherit" />}
                <span>Modify Stock</span>
              </Button>
            </div>
          </form>
        </Form>
      );
    }
  };

  const styles = `hover:cursor-pointer w-full p-1 rounded-md text-black`;

  return (
    <section>
      <div className="flex space-x-5 place-content-center">
        <div className="space-y-4 w-1/6 text-md mt-1">
          <Button
            id="Update"
            onClick={handleSelectTab}
            className={`${styles} ${
              activeTab === "Update"
                ? "bg-custom1 hover:bg-custom1 text-white"
                : "bg-gray-200"
            }`}
          >
            Update
          </Button>

          <Button
            id="Assign"
            onClick={handleSelectTab}
            className={`${styles} ${
              activeTab === "Assign"
                ? "bg-custom1 hover:bg-custom1 text-white"
                : "bg-gray-200"
            }`}
          >
            Assign
          </Button>
        </div>
        <Separator orientation="vertical" />
        <div>{displayContentTabs()}</div>
      </div>
    </section>
  );
};
export default UpdateStockForm;
