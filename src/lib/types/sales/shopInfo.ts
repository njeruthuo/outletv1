import { z } from "zod";

export interface ShopInfoProps {
  closeModal: (args?: boolean) => void;
  infoModalData: unknown[];
}

export interface AddEmployeeFormProps {
  closeModal: (args?: unknown) => void;
}

export const formSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(4, { message: "At least 4 chars are required" }),
  last_name: z.string().min(4, { message: "At least 4 chars are required" }),
  shop_id: z.string().min(1, { message: "Please select a shop" }),
});
