import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../types";
import { authApi } from "./login";

const initialState: InitialState = {
  // Remember to change this to false before production.
  isLoggedIn: true,
  token: "",
  salesMode: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = "";
    },

    toggleSalesMode: (state) => {
      state.salesMode = !state.salesMode;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isLoggedIn = true;
        state.token = payload.token;
      }
    );
  },
});

export const { logout, toggleSalesMode } = AuthSlice.actions;

export default AuthSlice.reducer;
