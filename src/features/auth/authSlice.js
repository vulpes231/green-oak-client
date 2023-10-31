import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  accessToken: null,
  userId: "",
  error: "",
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData) => {
    const response = await axios.post("http://localhost:3500/auth", userData);
    const accessToken = response.data.accessToken;
    const userId = response.data.userId;
    return { accessToken, userId };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken; // Set accessToken separately
      state.userId = action.payload.userId; // Set userId separately
      state.isLoggedIn = true;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.accessToken = null;
      state.isLoggedIn = false;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
