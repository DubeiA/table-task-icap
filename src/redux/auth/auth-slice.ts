import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut } from "./authOperation";

interface User {
  email: string | null;
  paassword: string | null;
}

interface AuthState {
  user: User;
  isLoggedIn: boolean;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: { paassword: null, email: null },
  isLoggedIn: false,
  token: null,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoggedIn = true;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { paassword: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoggedIn = true;
      });
  },
});

export const authReducer = authSlice.reducer;
