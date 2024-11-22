import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  handleSubmit?: (args?: unknown, args2?: unknown, args3?: unknown) => void;
}

const GlobalSubmitButton: React.FC<ButtonProps> = ({
  children,
  handleSubmit,
}) => {
  return handleSubmit ? (
    <Button
      className="bg-custom1 hover:bg-customPale flex place-items-center"
      type="submit"
      onClick={handleSubmit}
    >
      {children}
    </Button>
  ) : (
    <Button className="bg-custom1 hover:bg-customPale flex place-items-center" type="submit">
      {children}
    </Button>
  );
};
export default GlobalSubmitButton;
