import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/pages/auth/reducers/login";
import { setupListeners } from "@reduxjs/toolkit/query";
import AuthReducer from "@/pages/auth/reducers/AuthSlice";
import StockReducer from "@/features/stock/stockSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    stock: StockReducer,
    [authApi.reducerPath]: authApi.reducer, // Fix: Assign the authApi reducer to its reducerPath
    // Define your reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), // Fix: Add authApi middleware
});

setupListeners(store.dispatch);
