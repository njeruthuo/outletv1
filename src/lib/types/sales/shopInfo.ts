import { z } from "zod";
import { StockItem } from "../stock/StockItemTypes";

export interface Operator {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  photo: React.ImgHTMLAttributes<HTMLImageElement> | string;
}

export interface UserCardType {
  operator: Operator;
  onDisable: (args?: unknown) => void;
}

export interface TeamProps {
  branch_name: string;
  team?: Operator[];
}

export interface InfoModalData {
  branch_name: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  operators: Operator[];
  stock?: StockItem[];
}

export interface ShopInfoProps {
  coordinates?: [];
  closeModal: (args?: boolean) => void;
  infoModalData?: InfoModalData;
}

export interface AddEmployeeFormProps {
  closeModal: (args?: unknown) => void;
}

export const formSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(4, { message: "At least 4 chars are required" }),
  last_name: z.string().min(4, { message: "At least 4 chars are required" }),
  branch_name: z.string().min(1, { message: "Please select a shop" }),
});
