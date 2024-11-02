import { ReactNode } from "react";

export type GlobalModalPropTypes = {
  // title:string;
  open: boolean;
  closeFunc: () => void;
  children?: ReactNode;
};