import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devurl, getAccessToken, liveurl, sendError } from "../../constants";

// const devurl = "http://localhost:3500";
// const liveurl = "https://greenoak.onrender.com";

const initialState = {
	acctAddLoading: false,
	acctAddError: false,
	acctAdded: false,
	getExternalAcctLoading: false,
	getExternalAcctError: false,
	externalAccts: [],
};

export const addAccount = createAsyncThunk(
	"external/addAccount",
	async (formData) => {
		const url = `${liveurl}/external`;
		const accessToken = getAccessToken();
		try {
			// console.log("1");
			const response = await axios.post(url, formData, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});

			return response.data;
		} catch (error) {
			sendError(error);
		}
	}
);

export const getExternalAccounts = createAsyncThunk(
	"external/getExternalAccounts",
	async (username) => {
		const accessToken = getAccessToken();
		const url = `${devurl}/external`;
		try {
			const response = await axios.get(url, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});

			return response.data;
		} catch (error) {
			sendError(error);
		}
	}
);

const externalAccountSlice = createSlice({
	name: "external",
	initialState,
	reducers: {
		resetAddExternal(state) {
			state.acctAdded = false;
			state.acctAddError = false;
			state.acctAddLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addAccount.pending, (state) => {
				state.acctAddLoading = true;
			})
			.addCase(addAccount.fulfilled, (state, action) => {
				state.acctAddLoading = false;
				state.acctAddError = false;
				state.acctAdded = true;
			})
			.addCase(addAccount.rejected, (state, action) => {
				state.acctAddLoading = false;
				state.acctAddError = action.error.message;
				state.acctAdded = false;
			})
			.addCase(getExternalAccounts.pending, (state) => {
				state.getLoading = true;
			})
			.addCase(getExternalAccounts.fulfilled, (state, action) => {
				state.getLoading = false;
				state.getError = false;
				state.externalAccts = action.payload;
			})
			.addCase(getExternalAccounts.rejected, (state, action) => {
				state.getLoading = false;
				state.getError = action.error.message;
				state.externalAccts = [];
			});
	},
});
export const { resetAddExternal } = externalAccountSlice.actions;
export default externalAccountSlice.reducer;
