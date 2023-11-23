import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  isCreated: false,
};

export const createNewAccount = createAsyncThunk(
  "enrolluser/createNewAccount",
  async (formData) => {
    console.log(formData);
    const url = "http://localhost:3500/register";
    try {
      const response = await axios.post(url, formData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
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

const enrollUserSlice = createSlice({
  name: "enrolluser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewAccount.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createNewAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCreated = true;
        state.isError = false;
      })
      .addCase(createNewAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isCreated = false;
        state.isError = action.error.message;
      });
  },
});

export default enrollUserSlice.reducer;
