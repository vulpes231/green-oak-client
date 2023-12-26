import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "nyc/lib/fs-promises";

const initialState = {
  addLoading: false,
  addError: false,
  added: false,
};

export const addAccount = createAsyncThunk(
  "external/addAccount",
  async (formData, { getState }) => {
    const url = ``;
    const { accessToken } = getState().auth;
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      return response.data;
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

const externalAccountSlice = createSlice({
  name: "external",
  initialState,
  reducers: {
    reset(state) {
      state.added = false;
      state.addError = false;
      state.addLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAccount.pending, (state) => {
        state.addLoading = true;
      })
      .addCase(addAccount.fulfilled, (state) => {
        state.addLoading = false;
        state.addError = false;
        state.added = true;
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.error.message;
        state.added = false;
      });
  },
});
export const { reset } = externalAccountSlice.actions;
export default externalAccountSlice.reducer;
