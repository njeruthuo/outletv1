import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/pages/auth/reducers/login";
import { setupListeners } from "@reduxjs/toolkit/query";
import AuthReducer from "@/pages/auth/reducers/AuthSlice";
import StockReducer from "@/features/stock/stockSlice";
import { stockApi } from "@/features/stock/stockAPI";
import { categoryAPI } from "@/features/stock/categoryAPI";
import { brandAPI } from "@/features/stock/brandAPI";
import { salesAPI } from "@/features/sales/salesAPI";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    [authApi.reducerPath]: authApi.reducer,

    stock: StockReducer,
    [stockApi.reducerPath]: stockApi.reducer,

    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [brandAPI.reducerPath]: brandAPI.reducer,

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
