/**
 * Reducers defined here are meant to manage the shop state,
 * including items selected for sale and their total prices.
 */

import { StockItem } from "@/lib/types/stock/StockItemTypes";
import { createSlice } from "@reduxjs/toolkit";

export type CounterType = {
  quantity: number;
  stock: StockItem;
};

type State = {
  saleReducer: CounterType[];
};

const initialCounterState: CounterType[] = [];

export const saleSlice = createSlice({
  name: "saleSlice",
  initialState: initialCounterState,
  reducers: {
    // Add a sale item
    addItem: (state, action) => {
      const itemExists = state.find(
        (item) => item.stock.product.id === action.payload.product.id
      );
      if (!itemExists) {
        const newType = { quantity: 1, stock: action.payload };
        state.push(newType);
      } else {
        itemExists.quantity += 1;
      }
    },

    // Remove all sale items
    removeAllItems: () => {
      return [];
    },

    // Remove an item using an ID.
    removeItem: (state, action) => {
      return state.filter((item) => item.stock.product.id != action.payload);
    },

    // Reduce an item's quantity using an ID.
    reduceItemQuantity: (state, action) => {
      const itemToReduce = state.find(
        (item) => item.stock.product.id === action.payload
      );

      // If the item exists and the quantity is greater than 1, decrement the quantity
      if (itemToReduce && itemToReduce.quantity > 1) {
        itemToReduce.quantity -= 1;
      } else if (itemToReduce && itemToReduce.quantity === 1) {
        // If the quantity is 1, remove the item from the state
        return state.filter((item) => item.stock.product.id !== action.payload);
      }
    },

    // Add an item's quantity using an ID.
    addItemQuantity: (state, action) => {
      const itemToAdd = state.find(
        (item) => item.stock.product.id === action.payload
      );

      if (itemToAdd) {
        itemToAdd.quantity += 1;
      }
    },
  },
});

// Correctly select the entire state of saleSlice
export const selectAllCounterItems = (state: State): CounterType[] =>
  state.saleReducer;

export const {
  addItem,
  removeAllItems,
  removeItem,
  reduceItemQuantity,
  addItemQuantity,
} = saleSlice.actions;

export default saleSlice.reducer;
