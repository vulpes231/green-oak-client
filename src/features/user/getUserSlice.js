import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const devurl = "http://localhost:3500";
const liveurl = "https://greenoak.onrender.com";

const initialState = {
  isLoading: true,
  data: "",
  isError: "",
};

export const getUser = createAsyncThunk(
  "getuser/getUser",
  async (_, { getState }) => {
    try {
      const { accessToken, userId } = getState().auth;
      const url = `${liveurl}/user/${userId}`;
      const response = await axios.get(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw error;
      }
    }
  }
);

const getUserSlice = createSlice({
  name: "getuser",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.data = action.payload;
        } else {
          state.data = "";
        }
        state.isError = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.data = "";
        state.isError = action.error.message;
      });
  },
});

export default getUserSlice.reducer;
