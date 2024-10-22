import { configureStore } from "@reduxjs/toolkit";
import  AuthReducer from "@/pages/auth/reducers/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    // Define your reducers here
  },
});
