import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import StockReducer from "@/features/stock/stockSlice";
import { darajaAPI } from "@/features/sales/daraja/authorization";
import { brandAPI, categoryAPI, stockApi } from "@/features/stock";
import {
  authApi,
  AuthReducer,
  dashboardApi,
  notificationsApi,
  reportApi,
  salesAPI,
  saleSliceReducer,
} from "@/features";

export const store = configureStore({
  reducer: {
    [darajaAPI.reducerPath]: darajaAPI.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,

    auth: AuthReducer,
    [authApi.reducerPath]: authApi.reducer,

    stock: StockReducer,
    [stockApi.reducerPath]: stockApi.reducer,

    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [brandAPI.reducerPath]: brandAPI.reducer,

    saleReducer: saleSliceReducer,
    [salesAPI.reducerPath]: salesAPI.reducer,

    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      categoryAPI.middleware,
      brandAPI.middleware,
      salesAPI.middleware,
      stockApi.middleware,
      darajaAPI.middleware,
      notificationsApi.middleware,
      dashboardApi.middleware,
      reportApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
