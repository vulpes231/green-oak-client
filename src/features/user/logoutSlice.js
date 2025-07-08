import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devurl, getAccessToken, liveurl, sendError } from "../../constants";

const initialState = {
	logoutLoading: false,
	logoutError: false,
	loggedOut: false,
};

export const logoutUser = createAsyncThunk("logout/logoutUser", async () => {
	try {
		const accessToken = getAccessToken();
		const url = `${liveurl}/logout`;
		console.log(url);
		const response = await axios.put(
			url,
			{},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		sendError(error);
	}
});

const logoutSlice = createSlice({
	name: "logout",
	initialState,
	reducers: {
		resetLogout(state) {
			state.logoutLoading = false;
			state.logoutError = false;
			state.loggedOut = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(logoutUser.pending, (state) => {
				state.logoutLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.logoutLoading = false;
				state.logoutError = false;
				state.loggedOut = true;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.logoutLoading = false;
				state.logoutError = action.error.message;
				state.loggedOut = false;
			});
	},
});
export const { resetLogout } = logoutSlice.actions;
export default logoutSlice.reducer;
