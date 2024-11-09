import { Button, ButtonProps } from "@/components/ui/button";

const GlobalSubmitButton: React.FC<ButtonProps> = ({ children }) => {
  return (
    <Button className="bg-custom1 hover:bg-customPale" type="submit">
      {children}
    </Button>
  );
};
export default GlobalSubmitButton;
