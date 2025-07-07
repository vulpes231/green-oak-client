import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAccessToken, liveurl } from "../../constants";

// const devurl = "http://localhost:3500";
// const liveurl = "https://greenoak.onrender.com";

const initialState = {
	trfLoad: false,
	trfError: false,
	trfSuccess: false,
};

export const sendMoney = createAsyncThunk(
	"transfer/sendMoney",
	async (formData) => {
		const accessToken = getAccessToken();
		const url = `${liveurl}/transfer`;

		try {
			const response = await axios.post(url, formData, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (response.request.status === 403) {
				console.log("Token expired");
			}

			return response.data;
		} catch (error) {
			if (error.response) {
				const errorMessage = error.response.data.message || error.response.data;
				throw new Error(errorMessage);
			} else {
				throw error;
			}
		}
	}
);

const transferSlice = createSlice({
	name: "transfer",
	initialState,
	reducers: {
		resetTransfer(state) {
			state.trfLoad = false;
			state.trfError = false;
			state.trfSuccess = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(sendMoney.pending, (state) => {
				state.trfLoad = true;
			})
			.addCase(sendMoney.fulfilled, (state) => {
				state.trfLoad = false;
				state.trfError = false;
				state.trfSuccess = true;
			})
			.addCase(sendMoney.rejected, (state, action) => {
				state.trfLoad = false;
				state.trfError = action.error.message;
				state.trfSuccess = false;
			});
	},
});
export const { resetTransfer } = transferSlice.actions;
export default transferSlice.reducer;
