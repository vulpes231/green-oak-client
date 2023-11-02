import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  accounts: [],
  transactions: [],
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
      if (error.response) {
        // The server responded with an error status code (e.g., 400)
        // Extract the error message from the response
        const errorMessage = error.response.data.message; // Adjust this line to match the server's response structure
        throw new Error(errorMessage);
      } else {
        // Handle other types of errors (e.g., network issues)
        throw error;
      }
    }
  }
);

export const fetchUserTransactions = createAsyncThunk(
  "user/fetchUserTransactions",
  async ({ userId, token }) => {
    try {
      const response = await axios.get(
        `http://localhost:3500/transaction/${userId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const transactions = response.data; // Store the array of accounts
      return transactions;
    } catch (error) {
      if (error.response) {
        // The server responded with an error status code (e.g., 400)
        // Extract the error message from the response
        const errorMessage = error.response.data.message; // Adjust this line to match the server's response structure
        throw new Error(errorMessage);
      } else {
        // Handle other types of errors (e.g., network issues)
        throw error;
      }
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
        state.transactions = [];
        state.error = action.error.message;
      });
    builder
      .addCase(fetchUserTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.error = "";
      })
      .addCase(fetchUserTransactions.rejected, (state, action) => {
        state.loading = false;
        state.transactions = [];
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
