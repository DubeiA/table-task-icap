import { RootState } from "../store";

export const getUser = (state: RootState) => state.userReducer.user;
