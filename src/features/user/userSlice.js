import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  accounts: [],
  transactions: [],
  error: "",
};

const devurl = "http://localhost:3500";
const liveurl = "https://greenoak.onrender.com";

export const fetchUserAccount = createAsyncThunk(
  "user/fetchUserAccount",
  async (userId, { getState }) => {
    try {
      const { accessToken } = getState().auth;

      const response = await axios.get(`${liveurl}/account/${userId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response.data);

      const accounts = response.data;
      return accounts;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        throw new Error(errorMessage);
      } else {
        console.log(error);
        throw error;
      }
    }
  }
);

export const fetchUserTransactions = createAsyncThunk(
  "user/fetchUserTransactions",
  async (userId, { getState }) => {
    const { accessToken } = getState().auth;
    try {
      const response = await axios.get(`${liveurl}/transaction/${userId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const transactions = response.data; // Store the array of accounts
      return transactions;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        throw new Error(errorMessage);
      } else {
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
      .addCase(fetchUserAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
        state.error = "";
      })
      .addCase(fetchUserAccount.rejected, (state, action) => {
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
