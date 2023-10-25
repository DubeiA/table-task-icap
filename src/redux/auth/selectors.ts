import { RootState } from "../store";

export const selectIsLoggedIn = (state: RootState) =>
  state.authReducer.isLoggedIn;

export const selectUser = (state: RootState) => state.authReducer.user;
