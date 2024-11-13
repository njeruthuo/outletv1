import { z } from "zod";

export interface InfoModalData {
  branch_name: string;
  coordinates: {
    lat: string;
    lng: string;
  };
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
