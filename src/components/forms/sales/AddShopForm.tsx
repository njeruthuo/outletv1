import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { CircularProgress } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddShopMutation } from "@/features/sales/salesAPI";
import { AddShopFormSchema, AddShopProps } from "@/lib/types/sales/ShopType";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { GlobalCloseButton, GlobalSubmitButton } from "@/components/reusable";

const AddShopForm: React.FC<AddShopProps> = ({ closeModal }) => {
  /***
   *
   * In sales management Admin view, we need to see the list of all shops.
   * We need to assign stock for the shops to distribute.
   * We need to see the rates at which distribution happens per shop.
   * We need to be able to select to filter daily, weekly and monthly profits and rate which shop is most active.
   *
   *
   */
  const { toast } = useToast();
  const [addShop, { isLoading }] = useAddShopMutation();

  const form = useForm<z.infer<typeof AddShopFormSchema>>({
    resolver: zodResolver(AddShopFormSchema),
    defaultValues: {
      branch_name: "",
      location: "",
      licenses: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AddShopFormSchema>) {
    const formData = new FormData();
    formData.append("branch_name", values.branch_name);
    formData.append("location", values.location);

    if (values.licenses && values.licenses[0]) {
      formData.append("licenses", values.licenses[0]);
    }

    try {
      await addShop(formData).unwrap();
      toast({
        variant: "default",
        title: "Success",
        description: "Shop added successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description:
          "An error occurred while adding the shop. Please try again!",
      });
      console.error("Failed to add shop:", error);
    } finally {
      closeModal();
    }
  }
  return (
    <>
      <>
        <Form {...form}>
          <h2 className="text-xl font-bold my-1">Add New Shop</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="branch_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="E.g Maraba Outlet Shop"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        id="price_per_item"
                        placeholder="E.g Maraba, Witeithie, Thika"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="licenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload a license</FormLabel>
                    <FormControl>
                      <Input
                        id="licenses"
                        placeholder="County government license"
                        type="file"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <GlobalCloseButton closeModal={() => closeModal()}>
                <span>Close</span>
              </GlobalCloseButton>
              <GlobalSubmitButton>
                {isLoading && <CircularProgress size="md" color="inherit" />}
                <span>Add Shop</span>
              </GlobalSubmitButton>
            </div>
          </form>
        </Form>
      </>
    </>
  );
};
export default AddShopForm;
