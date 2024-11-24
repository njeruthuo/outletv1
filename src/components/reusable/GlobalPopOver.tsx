import { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PopOverProps {
  trigger: ReactNode;
  children: ReactNode;
  contentClassName?: string;
}

const GlobalPopOver = ({
  children,
  trigger,
  contentClassName,
}: PopOverProps) => {
  return (
    <div className="">
      <Popover>
        <PopoverTrigger>{trigger}</PopoverTrigger>
        <PopoverContent className={contentClassName}>{children}</PopoverContent>
      </Popover>
    </div>
  );
};
export default GlobalPopOver;
