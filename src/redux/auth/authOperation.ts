import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const setToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

interface LoginData {
  email: string;
  password: string;
}

export const logIn = createAsyncThunk(
  "auth/login",
  async (data: LoginData, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", data);
      setToken(res.data.token);

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async (data: any, thunkAPI) => {
    try {
      await axios.post("/users/logout", data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
