import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./userOperation";

export interface User {
  id: number | null;
  name: string | null;
  email: string | null;
  gender: string | null;
}

interface UserState {
  user: User[];
  isLoggedIn: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: [{ id: null, name: null, gender: null, email: null }],
  isLoggedIn: false,

  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log(action);

        state.user = action.payload;

        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoggedIn = true;
      });
    // .addCase(logOut.pending, (state) => {
    //   state.isLoggedIn = false;
    //   state.error = null;
    // })
    // .addCase(logOut.fulfilled, (state) => {
    //   state.user = { paassword: null, email: null };
    //   state.token = null;
    //   state.isLoggedIn = false;
    //   state.error = null;
    // })
    // .addCase(logOut.rejected, (state, action) => {
    //   state.error = action.payload as string;
    //   state.isLoggedIn = true;
    // });
  },
});

export const userReducer = userSlice.reducer;
