import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../types";
import { authApi } from "./login";

const initialState: InitialState = {
  isLoggedIn: false,
  token: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = "";
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

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;
