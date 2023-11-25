import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const devurl = "http://localhost:3500";
const liveurl = "https://greenoak.onrender.com";

const initialState = {
  isLoading: false,
  isChanged: false,
  isError: "",
};

export const editProfile = createAsyncThunk(
  "editprofile/editProfile",
  async (formData, { getState }) => {
    try {
      const { accessToken, userId } = getState().auth;
      const url = `${liveurl}/user/${userId}`;
      const response = axios.put(url, formData, {
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

const editProfileSlice = createSlice({
  name: "editprofile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isChanged = true;
        state.isError = "";
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isChanged = false;
        state.isError = action.error.message;
      });
  },
});

export default editProfileSlice.reducer;
