import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  handleSubmit?: (args?: unknown) => void;
}

const GlobalSubmitButton: React.FC<ButtonProps> = ({
  children,
  handleSubmit,
}) => {
  return handleSubmit ? (
    <Button
      className="bg-custom1 hover:bg-customPale"
      type="submit"
      onClick={handleSubmit}
    >
      {children}
    </Button>
  ) : (
    <Button className="bg-custom1 hover:bg-customPale" type="submit">
      {children}
    </Button>
  );
};
export default GlobalSubmitButton;
