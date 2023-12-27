import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const devurl = "http://localhost:3500";
const liveurl = "https://greenoak.onrender.com";

const initialState = {
  addLoading: false,
  addError: false,
  added: false,
  getLoading: false,
  getError: false,
  external: [],
};

export const addAccount = createAsyncThunk(
  "external/addAccount",
  async (formData, { getState }) => {
    const url = `${liveurl}/external`;
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

export const getExternalAccounts = createAsyncThunk(
  "external/getExternalAccounts",
  async (_, { getState }) => {
    const { accessToken, username } = getState().auth;
    const url = `${liveurl}/external/${username}`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 403) {
        // Redirect or handle the 403 Forbidden status here
        // For example, you might want to dispatch another action
        // dispatch(someAction());
        console.error("403 Forbidden:", response.data);
      }

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
      state.getLoading = false;
      state.getError = false;
      state.external = [];
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
      })
      .addCase(getExternalAccounts.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(getExternalAccounts.fulfilled, (state, action) => {
        state.getLoading = false;
        state.getError = false;
        state.external = action.payload;
      })
      .addCase(getExternalAccounts.rejected, (state, action) => {
        state.getLoading = false;
        state.getError = action.error.message;
        state.external = [];
      });
  },
});
export const { reset } = externalAccountSlice.actions;
export default externalAccountSlice.reducer;
