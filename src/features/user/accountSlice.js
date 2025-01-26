import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { liveurl, getAccessToken, sendError, devurl } from "../../constants";

const initialState = {
  getAccountLoading: false,
  getAccountError: false,
  userAccounts: false,
  getTrnxLoading: false,
  getTrnxError: false,
  userTrnxs: false,
};

export const getUserAccount = createAsyncThunk(
  "account/getUserAccount",
  async () => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveurl}/account`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

export const getUserTransactions = createAsyncThunk(
  "account/getUserTransactions",
  async () => {
    try {
      const url = `${devurl}/transaction`;
      const accessToken = getAccessToken();

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAccount.pending, (state) => {
        state.getAccountLoading = true;
      })
      .addCase(getUserAccount.fulfilled, (state, action) => {
        state.getAccountLoading = false;
        state.userAccounts = action.payload.accounts;
        state.getAccountError = false;
      })
      .addCase(getUserAccount.rejected, (state, action) => {
        state.getAccountLoading = false;
        state.userAccounts = false;
        state.getAccountError = action.error.message;
      });
    builder
      .addCase(getUserTransactions.pending, (state) => {
        state.getTrnxLoading = true;
      })
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.getTrnxLoading = false;
        state.userTrnxs = action.payload.userTransactions;
        state.getTrnxError = false;
      })
      .addCase(getUserTransactions.rejected, (state, action) => {
        state.getTrnxLoading = false;
        state.userTrnxs = false;
        state.getTrnxError = action.error.message;
      });
  },
});

export default accountSlice.reducer;
