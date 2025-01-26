import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devurl, getAccessToken, liveurl, sendError } from "../../constants";

const initialState = {
  getUserLoading: false,
  user: false,
  getUserError: false,
  updateUserLoading: false,
  updateUserError: false,
  userUpdated: false,
  changePassLoading: false,
  changePassError: false,
  passChanged: false,
};

export const getUser = createAsyncThunk("getuser/getUser", async () => {
  try {
    const accessToken = getAccessToken();
    const url = `${devurl}/user`;

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    sendError(error);
  }
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (formData) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveurl}/user`;
      const response = axios.put(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (formData) => {
    try {
      const accessToken = getAccessToken();
      const url = `${liveurl}/change-password`;
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetChangePass(state) {
      state.changePassLoading = false;
      state.passChanged = false;
      state.changePassError = false;
    },
    resetUpdateProfile(state) {
      state.updateUserLoading = false;
      state.userUpdated = false;
      state.updateUserError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.getUserLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.getUserLoading = false;
        state.user = action.payload.user;
        state.getUserError = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUserLoading = false;
        state.user = false;
        state.getUserError = action.error.message;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.updateUserLoading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.updateUserLoading = false;
        state.userUpdated = true;
        state.updateUserError = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserLoading = false;
        state.userUpdated = false;
        state.updateUserError = action.error.message;
      });
    builder
      .addCase(changePassword.pending, (state) => {
        state.changePassLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.changePassLoading = false;
        state.passChanged = true;
        state.changePassError = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePassLoading = false;
        state.passChanged = false;
        state.changePassError = action.error.message;
      });
  },
});

export const { resetChangePass, resetUpdateProfile } = userSlice.actions;
export default userSlice.reducer;
