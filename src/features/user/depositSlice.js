import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const devurl = "http://localhost:3500";
const liveurl = "https://greenoak.onrender.com";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const depositCheck = createAsyncThunk(
  "depositcheck/depositCheckSlice",
  async (formData, { getState }) => {
    const { accessToken, userId } = getState().auth;
    const url = `${devurl}/deposit/${userId}`;
    try {
      const response = await axios.post(url, formData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      console.log(response.data);
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

const depositCheckSlice = createSlice({
  name: "depositcheck",
  initialState,
  reducers: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(depositCheck.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(depositCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = "";
      })
      .addCase(depositCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.error.message;
      });
  },
});

export default depositCheckSlice.reducer;
