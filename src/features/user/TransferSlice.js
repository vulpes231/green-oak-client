import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const devurl = "http://localhost:3500";
const liveurl = "https://greenoak.onrender.com";

const initialState = {
  trfLoad: false,
  trfError: false,
  success: false,
};

export const sendMoney = createAsyncThunk(
  "transfer/sendMoney",
  async (formData, { getState }) => {
    const { accessToken } = getState().auth;
    const url = `${liveurl}/transfer`;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.request.status === 403) {
        console.log("Token expired");
      }

      console.log(response.data);

      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || error.response.data;
        throw new Error(errorMessage);
      } else {
        throw error;
      }
    }
  }
);

const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    reset(state) {
      state.trfLoad = false;
      state.trfError = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMoney.pending, (state) => {
        state.trfLoad = true;
      })
      .addCase(sendMoney.fulfilled, (state) => {
        state.trfLoad = false;
        state.trfError = false;
        state.success = true;
      })
      .addCase(sendMoney.rejected, (state, action) => {
        state.trfLoad = false;
        state.trfError = action.error.message;
        state.success = false;
      });
  },
});
export const { reset } = transferSlice.actions;
export default transferSlice.reducer;
