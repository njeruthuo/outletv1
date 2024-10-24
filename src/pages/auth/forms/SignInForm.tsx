import { z } from "zod";
import { formSchema } from "./schemas/SignInSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "../reducers/login";

const SignInForm = () => {
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Call the login mutation
      const result = await login(values).unwrap();
      console.log("Logged in successfully", result);
    } catch (error) {
      console.log("Failed to login", error);
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <section className="flex justify-center items-center h-full">
      <div className="w-1/2 ">
        <div className="mb-4">
          {/* <img src="./three.png" className="h-14 w-[50%] mb-2" alt="" /> */}
          <h3 className="text-2xl font-bold">Please sign in</h3>
          <p className="mr-auto">
            Please use your email and password to sign in...
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g johndoe@gmail.com..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button
              className="w-full bg-custom1 hover:bg-customPale"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
export default SignInForm;
