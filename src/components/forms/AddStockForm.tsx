import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddFormSchema } from "@/lib/types/AddFormTypes";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

import { Input } from "@/components/ui/input";

const AddStockForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof AddFormSchema>>({
    resolver: zodResolver(AddFormSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      brand: "",
      quantity: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof AddFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per unit</FormLabel>
                <FormControl>
                  <Input id="price" placeholder="e.g 200" {...field} />
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

        <Button className="z-[1400]" type="submit">
          Add Stock
        </Button>
      </form>
    </Form>
  );
};
export default AddStockForm;
