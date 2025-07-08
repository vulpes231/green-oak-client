import React, { useEffect, useState } from "react";
import { AnimatedInput, Error, Loader, Success } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { resetTransfer, sendMoney } from "../features/user/TransferSlice";

const styles = {
	label:
		"block text-[14px] font-semibold text-[#979797] text-[14px] font-normal",
	input:
		"w-full px-4 py-3 border border-[#dedede] focus:ring-2 focus:ring-green-500 focus:border-transparent h-[48px] rounded-[5px] outline-none",
};

const Crypto = () => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		walletAddress: "",
		amount: "",
		network: "",
	});
	const [error, setError] = useState("");

	const { trfLoad, trfError, trfSuccess } = useSelector(
		(state) => state.transfer
	);

	const handleInput = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (parseFloat(form.amount) > 100) {
			setError("You have exceeded your withdrawal limit!");
			return;
		}

		const formData = {
			from: "user",
			to: form.walletAddress,
			amount: form.amount,
			memo: `Withrawal via USDT ${form.network.toUpperCase()}`,
			date: new Date(),
		};
		console.log(formData);
		dispatch(sendMoney(formData));
	};

	useEffect(() => {
		if (trfError) {
			setError(trfError);
		}
	}, [trfError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetTransfer());
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	useEffect(() => {
		let timeout;
		if (trfSuccess) {
			timeout = setTimeout(() => {
				dispatch(resetTransfer());
				window.location.reload();
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [trfSuccess, dispatch]);

	return (
		<div className="bg-white rounded-xl shadow-md overflow-hidden">
			<div className="p-8">
				<div className="mb-8 text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">
						Withdraw USDT
					</h2>
					<p className="text-gray-500">Transfer to your external wallet</p>
				</div>

				<form className="flex flex-col gap-4">
					<div className="grid lg:grid-cols-2 gap-4">
						{/* Network Selection */}
						<div className="space-y-2">
							<label className={styles.label}>Network</label>
							<div className="relative">
								<select
									name="network"
									value={form.network}
									onChange={handleInput}
									className="block w-full pl-4 pr-10 py-3 text-base bg-white border border-[#dedede] focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none  bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjd2ViYzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem] h-[48px] text-[12px] rounded-[5px]"
									required
								>
									<option value="" disabled>
										Select network
									</option>
									<option value="erc20">ERC20 (Ethereum)</option>
									<option value="trc20">TRC20 (Tron)</option>
								</select>
							</div>
						</div>

						{/* Amount */}
						<div className="space-y-2">
							<label className={styles.label}>Amount (USDT)</label>
							<div className="relative">
								<AnimatedInput
									type="text"
									placeholder="0.00"
									value={form.amount}
									onChange={handleInput}
									name="amount"
									required
									className={styles.input}
								/>
								<span className="absolute right-4 top-3 text-gray-500">
									USDT
								</span>
							</div>
						</div>
					</div>

					{/* Wallet Address */}
					<div className="space-y-2">
						<label className={styles.label}>Wallet Address</label>
						<AnimatedInput
							type="text"
							placeholder="0x1f5...3020"
							value={form.walletAddress}
							onChange={handleInput}
							name="walletAddress"
							required
							className={styles.input}
						/>
						<p className="text-xs text-gray-500 mt-1">
							Ensure this address supports{" "}
							{form.network.toUpperCase() || "selected"} network
						</p>
					</div>

					{/* Submit Button */}
					<button
						onClick={handleSubmit}
						type="submit"
						className="py-3.5 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed w-[180px]"
					>
						Withdraw Funds
					</button>
				</form>

				{/* Security Note */}
				<div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-100">
					<p className="text-xs text-gray-500 text-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 inline mr-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
						All transactions are secured with bank-level encryption
					</p>
				</div>
			</div>
			{error && (
				<Error error={error} onClose={() => setError("")} duration={3000} />
			)}
			{trfLoad && <Loader text={"Initiating Withdrawal..."} />}
			{trfSuccess && (
				<Success
					onClose={() => {
						dispatch(resetTransfer());
					}}
					duration={3000}
					text={"USDT Withdrawal initiated."}
				/>
			)}
		</div>
	);
};

export default Crypto;
