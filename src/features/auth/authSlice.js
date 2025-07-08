import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devurl, getAccessToken, liveurl, sendError } from "../../constants";

const initialState = {
	loginLoading: false,
	accessToken: false,
	loginError: false,
	email: false,
	username: false,
};

export const loginUser = createAsyncThunk(
	"user/loginUser",
	async (userData) => {
		try {
			const response = await axios.post(`${liveurl}/auth`, userData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (error) {
			sendError(error);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetLogin(state) {
			state.loginLoading = false;
			state.accessToken = false;
			state.email = false;
			state.username = false;
			state.loginError = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state) => {
			state.loginLoading = true;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.loginLoading = false;
			state.accessToken = action.payload.accessToken;
			state.email = action.payload.email;
			state.username = action.payload.username;
			state.loginError = false;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.loginLoading = false;
			state.accessToken = false;
			state.email = false;
			state.username = false;
			state.loginError = action.error.message;
		});
	},
});

export const { resetLogin } = authSlice.actions;
export default authSlice.reducer;
