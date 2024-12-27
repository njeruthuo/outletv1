import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Spinner } from "../spinner";

interface ButtonProps {
  children: ReactNode;
  handleSubmit?: (...args: unknown[]) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const GlobalSubmitButton: React.FC<ButtonProps> = ({
  children,
  handleSubmit,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <Button
      className={ButtonStyles}
      type="submit"
      onClick={handleSubmit}
      disabled={disabled}
    >
      {isLoading && <Spinner />}
      {children}
    </Button>
  );
};

export default GlobalSubmitButton;

const ButtonStyles = `bg-custom1 w-full hover:bg-customPale flex place-items-center disabled:cursor-not-allowed`;
