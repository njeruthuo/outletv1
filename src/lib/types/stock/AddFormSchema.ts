"use client";

import { z } from "zod";

export const AddFormSchema = z.object({
  name: z.string().min(2).max(50),
  price_per_item: z.string().min(1).max(50),
  category: z.string().min(2).max(50),
  brand: z.string().min(2).max(50),
  quantity: z.string().min(1).max(50),
});

export const AssignShopSchema = z.object({
  name: z.string().min(2).max(50),
  price_per_item: z.string().min(1).max(50),
  category: z.string().min(2).max(50),
  shop: z.string().min(2).max(50),
  quantity: z.string().min(1).max(50),
});
