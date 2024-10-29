export type StockItem = {
  last_updated: Date;
  product: {
    name: string;
    price_per_item: string;
    category: "DRY FOODS" | "TOILETRIES" | "CLEANING AGENTS";
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
};

export type StockRow = {
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
