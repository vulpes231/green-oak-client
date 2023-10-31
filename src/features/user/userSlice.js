import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  username: "",
  id: "",
  account_bal: "",
  account_type: "",
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userId, accessToken) => {
    axios
      .get(`http://localhost:3500/user/${userId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  //   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        // state.account_bal = action.payload;
        // state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        // Handle rejected action
      });
  },
});

export default userSlice.reducer;
