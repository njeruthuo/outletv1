import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import StockReducer from "@/features/stock/stockSlice";
import AuthReducer from "@/pages/auth/reducers/AuthSlice";

import { salesAPI } from "@/features/sales/salesAPI";
import { authApi } from "@/pages/auth/reducers/login";
import saleSliceReducer from "@/features/sales/saleSlice";

import { brandAPI, categoryAPI, stockApi } from "@/features/stock";
import { darajaAPI } from "@/features/sales/daraja/authorization";

export const store = configureStore({
  reducer: {
    [darajaAPI.reducerPath]: darajaAPI.reducer,

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
      .concat(stockApi.middleware)
      .concat(darajaAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
