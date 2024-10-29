"use client";

import { z } from "zod";

export const AddFormSchema = z.object({
  name: z.string().min(2).max(50),
  price: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  brand: z.string().min(2).max(50),
  quantity: z.string().min(2).max(50),
//   category: z.string().min(2).max(50),
});
