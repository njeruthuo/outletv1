import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GlobalSubmitButton } from "../reusable";
import { StyledInput } from "../custom/custom-components";
import { useChangePasswordMutation } from "@/features/auth/authApi";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  oldPassword: z.string().min(5),
  newPassword: z
    .string()
    .min(8, { message: "Password must be longer that 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be longer that 8 characters" }),
});

const PasswordChangeForm = () => {
  const { toast } = useToast();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (values.newPassword !== values.confirmPassword) {
      console.log("Not possible");
      return;
    }

    try {
      const response = await changePassword(values).unwrap();

      if (response?.SUCCESS == "PASSWORD WAS CHANGED SUCCESSFULLY!") {
        toast({
          title: "Success!",
          description: "Password change was successful",
        });
        form.reset();
      }
      console.log(response, "response");
    } catch (error) {
      console.log(error);

      toast({
        title: "Error!",
        description: "There was a problem changing your password!",
        variant: "destructive",
      });
    }
  }

  return (
    <section className="text-left">
      <h2 className="text-2xl">Change your password</h2>
      <p className="text-sm mb-2 mt-1">
        Please fill this form to change your password
      </p>

      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-left">Old password</FormLabel>
                  <FormControl>
                    <StyledInput placeholder="Old password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-left">New password</FormLabel>
                  <FormControl>
                    <StyledInput
                      placeholder="New password..."
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-left">Confirm password</FormLabel>
                  <FormControl>
                    <StyledInput
                      placeholder="Confirm password..."
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full mx-auto flex">
              <GlobalSubmitButton isLoading={isLoading} disabled={isLoading}>
                Change Password
              </GlobalSubmitButton>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default PasswordChangeForm;
