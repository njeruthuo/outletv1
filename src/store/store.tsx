import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/pages/auth/reducers/login";
import { setupListeners } from "@reduxjs/toolkit/query";
import AuthReducer from "@/pages/auth/reducers/AuthSlice";
import StockReducer from "@/features/stock/stockSlice";
import { stockApi } from "@/features/stock/stockAPI";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    [authApi.reducerPath]: authApi.reducer,

    stock: StockReducer,
    [stockApi.reducerPath]: stockApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(stockApi.middleware),
});

setupListeners(store.dispatch);
