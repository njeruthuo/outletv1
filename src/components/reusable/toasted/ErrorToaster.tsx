import { useToast } from "@/hooks/use-toast";

const ErrorToaster = (message: string) => {
  const { toast } = useToast();
  return toast({
    variant: "destructive",
    title: "Error Occurred",
    description: message,
  });
};
export default ErrorToaster;
