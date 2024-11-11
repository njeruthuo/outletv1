import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const useToasters = () => {
  const { toast } = useToast();
  const success = (message: string) =>
    toast({
      className: cn(
        "top-0 left-1/2 -translate-x-1/2 z-1300 fixed md:max-w-[420px] md:top-4"
      ),
      variant: "default",
      title: "Success",
      description: message,
    });

  const failed = (message: string) =>
    toast({
      className: cn(
        "top-0 left-1/2 -translate-x-1/2 z-1300 fixed md:max-w-[420px] md:top-4"
      ),
      variant: "destructive",
      title: "Error Occurred",
      description: message,
    });
  return { success, failed };
};
export default useToasters;
