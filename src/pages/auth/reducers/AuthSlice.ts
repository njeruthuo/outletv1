import { AccessLevelEvaluator } from "@/utils/rank";
import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../types";
import { authApi } from "./login";
// import { RootState } from "@/store/store";

const initialState: InitialState = {
  isLoggedIn: localStorage.getItem("authToken") !== "",
  token: localStorage.getItem("authToken") || "",
  salesMode: false,
  access_level: AccessLevelEvaluator(),
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = "";
      localStorage.removeItem("authToken");
      localStorage.removeItem("accessLevel");
    },

    toggleSalesMode: (state) => {
      state.salesMode = !state.salesMode;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log(payload, "payload");
        state.isLoggedIn = true;
        state.token = payload.token;
        state.access_level = payload.access;
        localStorage.setItem("authToken", payload.token);
        localStorage.setItem("accessLevel", payload.access);
      }
    );
  },
});

export const { logout, toggleSalesMode } = AuthSlice.actions;

export default AuthSlice.reducer;
