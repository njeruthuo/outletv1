import { useToast } from "@/hooks/use-toast";

const SuccessToaster = (message: string) => {
  const { toast } = useToast();
  return toast({
    variant: "default",
    title: "Success",
    description: message,
  });
};
export default SuccessToaster;
