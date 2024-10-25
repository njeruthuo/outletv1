import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "Rice",
      price_per_unit: 5.99,
      brand: "FreshFarm",
      category: "DRYFOODS",
      quantity_in_stock: 200,
      reorder_level: 50,
    },
    {
      id: 2,
      name: "Detergent",
      price_per_unit: 3.5,
      brand: "CleanCo",
      category: "TOILETRIES",
      quantity_in_stock: 150,
      reorder_level: 30,
    },
    {
      id: 3,
      name: "Mineral Water",
      price_per_unit: 1.25,
      brand: "PureWater",
      category: "BEVERAGES",
      quantity_in_stock: 500,
      reorder_level: 100,
    },
    {
      id: 4,
      name: "Potato Chips",
      price_per_unit: 2.0,
      brand: "SnackAttack",
      category: "SNACKS",
      quantity_in_stock: 300,
      reorder_level: 60,
    },
    {
      id: 5,
      name: "Pasta",
      price_per_unit: 1.75,
      brand: "FreshFarm",
      category: "DRYFOODS",
      quantity_in_stock: 100,
      reorder_level: 20,
    },
    {
      id: 6,
      name: "Shampoo",
      price_per_unit: 4.75,
      brand: "CleanCo",
      category: "TOILETRIES",
      quantity_in_stock: 80,
      reorder_level: 25,
    },
  ],
  categories: [
    {
      id: 1,
      name: "DRYFOODS",
      amount: 23064,
      fill: "var(--color-chrome)",
    },
    {
      id: 2,
      name: "TOILETRIES",
      amount: 23554,
      fill: "var(--color-edge)",
    },
    {
      id: 3,
      name: "BEVERAGES",
      amount: 30064,
      fill: "var(--color-firefox)",
    },
    {
      id: 4,
      name: "SNACKS",
      amount: 23964,
      fill: "var(--color-safari)",
    },
  ],
  brands: [
    {
      id: 1,
      name: "FreshFarm",
      contact: "555-1234",
    },
    {
      id: 2,
      name: "CleanCo",
      contact: "555-5678",
    },
    {
      id: 3,
      name: "PureWater",
      contact: "555-8765",
    },
    {
      id: 4,
      name: "SnackAttack",
      contact: "555-4321",
    },
  ],
  stock: [
    {
      product_id: 1,
      quantity_in_stock: 200,
      last_restocked: "2024-09-10",
    },
    {
      product_id: 2,
      quantity_in_stock: 150,
      last_restocked: "2024-09-15",
    },
    {
      product_id: 3,
      quantity_in_stock: 500,
      last_restocked: "2024-10-01",
    },
    {
      product_id: 4,
      quantity_in_stock: 300,
      last_restocked: "2024-10-05",
    },
    {
      product_id: 5,
      quantity_in_stock: 100,
      last_restocked: "2024-09-20",
    },
    {
      product_id: 6,
      quantity_in_stock: 80,
      last_restocked: "2024-10-10",
    },
  ],
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
});

export default stockSlice.reducer;

export const selectAllCategories = (state: { stock: { categories: [] } }) =>
  state.stock.categories;
