import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const devurl = "http://localhost:3500";
const liveurl = "https://greenoak.onrender.com";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  accessToken: null,
  userId: null,
  username: "",
  error: "",
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData) => {
    try {
      const response = await axios.post(`${liveurl}/auth`, userData);
      const accessToken = response.data.accessToken;
      const userId = response.data.userId;
      const username = response.data.username;
      return { accessToken, userId, username };
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        const errorMessage = error.response.data.message; //
        throw new Error(errorMessage);
      } else {
        // Handle other types of errors (e.g., network issues)
        throw error;
      }
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async (token) => {
  const response = await axios.get(`${devurl}/logout`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.isLoggedIn = true;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.accessToken = null;
      state.isLoggedIn = false;
      state.userId = "";
      state.username = "";
      state.error = action.error.message;
    });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.accessToken = null;
        state.isLoggedIn = false;
        state.userId = "";
        state.username = "";
        state.error = "";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.accessToken = null;
        state.isLoggedIn = false;
        state.userId = "";
        state.username = "";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
