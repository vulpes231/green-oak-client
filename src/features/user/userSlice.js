import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  accounts: [],
  error: "",
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async ({ userId, token }) => {
    try {
      const response = await axios.get(
        `http://localhost:3500/account/${userId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const accounts = response.data; // Store the array of accounts
      return accounts;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  //   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
        state.error = "";
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.accounts = [];
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
