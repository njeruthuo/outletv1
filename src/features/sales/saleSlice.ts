import { StockItem } from "@/lib/types/stock/StockItemTypes";
import { createSlice } from "@reduxjs/toolkit";

type State = {
  saleReducer: unknown;
};

/**
 * Reducers defined here are meant to manage the shop state,
 * including items selected for sale and their total prices.
 */
const initialCounterState: StockItem[] = [];

export const saleSlice = createSlice({
  name: "saleSlice",
  initialState: initialCounterState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
  },
});

// Correctly select the entire state of saleSlice
export const selectAllCounterItems = (state: State) => state.saleReducer;

export const { addItem } = saleSlice.actions;

export default saleSlice.reducer;
