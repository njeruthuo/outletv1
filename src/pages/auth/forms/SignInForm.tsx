import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formSchema } from "./schemas/SignInSchema";
import { useLoginMutation } from "../reducers/login";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { LoadingSpinner } from "@/utils/spinner";
import { cn } from "@/lib/utils";
const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
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
      const result = await login(values).unwrap();
      toast({
        title: "Login success",
        description: "You will be redirected shortly",
      });
      navigate("/");
      // console.log(result);

      return result;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Username or password is incorrect",
      });

      console.log("Failed to login", error);
    }
  }

  return (
    <section className="flex justify-center items-center h-full">
      <div className="w-1/2 ">
        <div className="mb-4">
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

            <Button
              className="w-full bg-custom1 hover:bg-customPale flex"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span>
                    {/* <LoadingSpinner className={""}/> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={cn("animate-spin")} // `cn` is used for combining classes dynamically
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  </span>
                  <span>Sign In</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
export default SignInForm;
