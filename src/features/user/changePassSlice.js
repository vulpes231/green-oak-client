import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const devurl = "http://localhost:3500";
const liveurl = "https://greenoak.onrender.com";

const initialState = {
  isLoading: false,
  isChanged: false,
  isError: "",
};

export const changePassword = createAsyncThunk(
  "changepassword/changePassword",
  async (formData, { getState }) => {
    try {
      const { accessToken, userId } = getState().auth;
      const url = `${liveurl}/change-password/${userId}`;
      const response = await axios.put(url, formData, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      return response.data;
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

const changePassSlice = createSlice({
  name: "changepassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isChanged = true;
        state.isError = "";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isChanged = false;
        state.isError = action.error.message;
      });
  },
});

export default changePassSlice.reducer;
