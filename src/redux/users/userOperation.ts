import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "user/info",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://65378f3ebb226bb85dd36cd0.mockapi.io/users"
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
