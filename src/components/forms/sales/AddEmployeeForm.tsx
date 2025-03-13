import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShopType } from "@/lib/types/sales/ShopType";
import { useFetchShops } from "@/hooks/custom/useShops";
import { formSchema } from "@/lib/types/sales/shopInfo";
import { GlobalSubmitButton } from "@/components/reusable";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CircularProgress } from "@mui/material";
import { useAddEmployeeMutation } from "@/features/sales/salesAPI";
import useToasters from "@/components/reusable/toasted/useToasters";

const AddEmployeeForm = ({
  closeModal
}: {
  closeModal?: (arg?: unknown) => void;
}) => {
  const { failed, success } = useToasters();
  const { shops, isLoading } = useFetchShops();
  const [addEmployee] = useAddEmployeeMutation();

  console.log(closeModal);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      branch_name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Send
      await addEmployee(values).unwrap();
      success(
        `Employee ${
          values.first_name + " " + values.first_name
        } successfully added to shop ${values.branch_name}!`
      );
    } catch (error) {
      console.log(error);
      failed("There was an error processing that request! Please try again.");
    } finally {
      // closeModal();
    }
    // console.log(values);
  }

  return (
    <div className="space-y-6 text-left">
      <div className="">
        <h2 className="text-2xl">Add an Employee</h2>
        <p className="text-sm mb-2 mt-1">
          Please fill this form to add an employee
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@domain.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branch_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Shop</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a shop" />
                    </SelectTrigger>
                    <SelectContent className="z-[1400]">
                      {shops?.map((shop: ShopType, index: number) => {
                        return (
                          <SelectItem key={index} value={shop.branch_name}>
                            {shop.branch_name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            {/* <GlobalCloseButton closeModal={closeModal}>Close</GlobalCloseButton> */}
            <GlobalSubmitButton>
              {isLoading && <CircularProgress size="md" color="inherit" />}
              <span>Submit</span>
            </GlobalSubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddEmployeeForm;
