import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../types";

const initialState: InitialState = {
  isLoggedIn: true,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // inc: (state) => {},
  },
});

// export const { inc } = AuthSlice.actions;

export default AuthSlice.reducer;
