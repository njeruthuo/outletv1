import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/pages/auth/reducers/AuthSlice";
import { authApi } from "@/pages/auth/reducers/login";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    [authApi.reducerPath]: authApi.reducer, // Fix: Assign the authApi reducer to its reducerPath
    // Define your reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware), // Fix: Add authApi middleware
});

