import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface CustomCloseButtonProps {
  closeModal?: (args?: unknown) => void;
  children: ReactNode;
}

const GlobalCloseButton: React.FC<CustomCloseButtonProps> = ({
  children,
  closeModal,
}) => {
  return (
    <Button
      className="bg-custom2 hover:bg-custom2 mr-auto"
      onClick={closeModal}
    >
      {children}
    </Button>
  );
};
export default GlobalCloseButton;
