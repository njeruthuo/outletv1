import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { AddFormSchema } from "@/lib/types/AddFormTypes";
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

type AddStockProps = {
  closeModal: () => void;
};

const AddStockForm: React.FC<AddStockProps> = ({ closeModal }) => {
  const { toast } = useToast();
  const [addStock, { isLoading }] = useAddStockMutation();
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
      toast({
        variant: "destructive",
        title: "Failed",
        description: "An error occurred while adding stock item",
      });
      console.log("Failed to add stock:", error);
    }
  }

  return (
    <Form {...form}>
      <h2 className="text-xl font-bold">Add Stock</h2>
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
                      <SelectItem value="DRY FOODS">DRY FOODS</SelectItem>
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

        <Button className="bg-custom1 hover:bg-customPale" type="submit">
          {isLoading && <CircularProgress size="sm" color="" />}
          <span>Add Stock</span>
        </Button>
      </form>
    </Form>
  );
};
export default AddStockForm;
