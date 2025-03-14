"use client";
import { ICellRendererParams } from "ag-grid-community";

import { z } from "zod";
import { StockItem } from "../stock/StockItemTypes";
import { Operator } from "./shopInfo";

export const AddShopFormSchema = z.object({
  branch_name: z.string().min(2).max(50),
  location: z.string().min(1).max(50),
  licenses: z.any(),
});

export type AddShopProps = {
  closeModal: () => void;
};

export interface ShopType {
  id: number;
  avg_weekly_profit?: string;
  branch_name: string;
  licenses?: string;
  location?: string;
  opening_date: Date;
  weight_tat?: number;
  current_load?: StockItem[];
  stock?: StockItem[];
  coordinates?: { lat: string; lng: string };
  operators?: Operator[];
}

export type ShopColumn = {
  field: string;
  flex: number;
  headerName?: string;
  cellRenderer?: (params: ICellRendererParams) => React.ReactElement;
};
