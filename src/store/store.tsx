import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import StockReducer from "@/features/stock/stockSlice";
import AuthReducer from "@/pages/auth/reducers/AuthSlice";

import { salesAPI } from "@/features/sales/salesAPI";
import { authApi } from "@/pages/auth/reducers/login";
import saleSliceReducer from "@/features/sales/saleSlice";

import { brandAPI, categoryAPI, stockApi } from "@/features/stock";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    [authApi.reducerPath]: authApi.reducer,

    stock: StockReducer,
    [stockApi.reducerPath]: stockApi.reducer,

    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [brandAPI.reducerPath]: brandAPI.reducer,

    saleReducer: saleSliceReducer,
    [salesAPI.reducerPath]: salesAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categoryAPI.middleware)
      .concat(brandAPI.middleware)
      .concat(salesAPI.middleware)
      .concat(stockApi.middleware),
});

setupListeners(store.dispatch);
