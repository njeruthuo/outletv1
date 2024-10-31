import { ICellRendererParams } from "ag-grid-community";

export type StockItem = {
  id?: number;
  last_updated: Date;
  product: {
    name: string;
    price_per_item: string;
    category: {
      name: string;
    };
    brand: {
      name: string;
      contact: string;
    };
  };
  quantity: number;
};

export type StockColumn = {
  field: string;
  flex: number;
  headerName?: string;
  cellRenderer?: (params: ICellRendererParams) => React.ReactElement;
};

export type StockRow = {
  id?: number;
  name: string;
  price: string;
  quantity: number;
  last_updated: Date;
  category: string;
  brand: string;
};

export type ReusableGridProps = {
  rows: StockRow[]; // Array of StockRow items
  colsDefs: StockColumn[]; // Array of StockColumn definitions
};

export type StockProps = {
  closeModal: () => void;
  args?: StockRow;
};
export interface filterType {
  filterBrand: string;
  filterCategory: string;
}