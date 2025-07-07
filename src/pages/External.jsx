import React, { useEffect, useState } from "react";
import { AnimatedInput, Error, HomeButton, Success } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
	addAccount,
	resetAddExternal,
} from "../features/user/externalAcctSlice";
import { FaCheckCircle } from "react-icons/fa";
import Authnav from "../components/Authnav";

const initState = {
	account: "",
	routing: "",
	nick: "",
	type: "",
};

const External = () => {
	const dispatch = useDispatch();
	const [form, setForm] = useState(initState);
	const [error, setError] = useState("");

	const { acctAddLoading, acctAddError, acctAdded, externalAccts } =
		useSelector((state) => state.external);

	// console.log(addError);

	const resetInput = () => {
		setForm(initState);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(form);
		dispatch(addAccount(form));
	};

	useEffect(() => {
		if (acctAddError) {
			setError(acctAddError);
		}
	}, [acctAddError]);

	useEffect(() => {
		let timeout;
		if (acctAddError) {
			resetInput();
			timeout = setTimeout(() => {
				dispatch(resetAddExternal());
				setError();
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [acctAddError, dispatch]);

	useEffect(() => {
		let timeout;
		if (acctAdded) {
			// console.log("acctAdded");
			resetInput();
			timeout = setTimeout(() => {
				dispatch(resetAddExternal());
				window.location.reload();
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [acctAdded, dispatch]);

	useEffect(() => {
		document.title = "RegentOak | External Accounts";
	}, []);

	return (
		<section className="p-6 flex flex-col gap-4 bg-slate-200">
			<div className="">
				<Authnav />
				{/* <h3 className="text-2xl mb-5">Add External Account</h3> */}
				<form className=" bg-white rounded-xl shadow-sm p-8 space-y-6">
					{/* Form Header */}
					<div className="text-center">
						<h2 className="text-2xl font-semibold text-gray-800">
							Add External Account
						</h2>
						<p className="text-gray-500 mt-1">
							Connect your bank account for transfers
						</p>
					</div>

					{/* Form Fields */}
					<div className="space-y-5">
						{/* Account Number */}
						<div className="space-y-1">
							<label className="block text-sm font-medium text-gray-700">
								Account Number
							</label>
							<AnimatedInput
								placeholder="Enter 10-12 digit account number"
								value={form.account}
								onChange={handleInputChange}
								name="account"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
							/>
						</div>

						{/* Routing Number */}
						<div className="space-y-1">
							<label className="block text-sm font-medium text-gray-700">
								Routing Number
							</label>
							<AnimatedInput
								placeholder="Enter 9-digit routing number"
								value={form.routing}
								onChange={handleInputChange}
								name="routing"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
							/>
						</div>

						{/* Account Nickname */}
						<div className="space-y-1">
							<label className="block text-sm font-medium text-gray-700">
								Account Nickname
							</label>
							<AnimatedInput
								placeholder="e.g. 'Primary Checking'"
								value={form.nick}
								onChange={handleInputChange}
								name="nick"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
							/>
							<p className="text-xs text-gray-500">For your reference only</p>
						</div>

						{/* Account Type */}
						<div className="space-y-1">
							<label className="block text-sm font-medium text-gray-700">
								Account Type
							</label>
							<select
								placeholder="Select account type"
								value={form.type}
								onChange={handleInputChange}
								name="type"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
							>
								<option value="">Choose Account Type</option>
								<option value="checking">Checking</option>
								<option value="savings">Savings</option>
								<option value="business">Business Checking</option>
							</select>
						</div>
					</div>

					{/* Submit Button */}
					<button
						type="button"
						onClick={handleSubmit}
						disabled={acctAddLoading}
						className={`w-full py-3.5 px-4 rounded-lg font-medium text-white transition-colors ${
							acctAddLoading
								? "bg-gray-400 cursor-not-allowed"
								: "bg-green-600 hover:bg-green-700 shadow-sm"
						}`}
					>
						{acctAddLoading ? (
							<span className="flex items-center justify-center gap-2">
								<svg
									className="animate-spin h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Processing...
							</span>
						) : (
							"Add Bank Account"
						)}
					</button>

					{/* Security Note */}
					<p className="text-xs text-gray-400 text-center mt-4">
						Your information is secured with bank-level encryption
					</p>
				</form>
			</div>
			{error && (
				<Error
					text={error}
					onClose={() => {
						dispatch(resetAddExternal());
					}}
					duration={3000}
				/>
			)}
			{acctAdded && (
				<Success
					text="External account added successfully."
					onClose={() => {
						dispatch();
					}}
					duration={3000}
				/>
			)}
		</section>
	);
};

export default External;
