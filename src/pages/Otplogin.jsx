import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, Success } from "../components"; // Ensure Success is imported
import { getLoginCode, resetLoginOtp } from "../features/auth/otpSlice"; // Ensure resetLoginOtp is imported
import { useNavigate } from "react-router-dom"; // Ensure useNavigate is imported

const Otplogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate(); // Initialize navigate hook
	const [otpSent, setOtpSent] = useState(false);
	const [error, setError] = useState("");
	const [form, setForm] = useState({ otp: "" });
	const [otpVerified, setOtpVerified] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const email = sessionStorage.getItem("email");

	const data = { email: email };

	const { otpLoading, otpError, loginOtp } = useSelector((state) => state.otp);

	const handleInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setIsDisabled(e.target.value.length !== 6);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		console.log(loginOtp);

		if (!form.otp) {
			setError("OTP required!");
			return;
		}

		if (loginOtp === form.otp) {
			setOtpVerified(true);
			dispatch(resetLoginOtp());
			window.location.href = "/dashboard";
		} else {
			setError("Incorrect OTP Code!");
		}
	};

	useEffect(() => {
		if (otpError) {
			setError(otpError);
		}
	}, [otpError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	useEffect(() => {
		if (email && !otpSent) {
			dispatch(getLoginCode(data));
			setOtpSent(true); // Mark OTP as sent to prevent resending
			console.log("otp sent");
		}
	}, []); //email, otpSent

	useEffect(() => {
		document.title = "RegentOak - Verify Login";
	}, []);

	useEffect(() => {
		let timeout;
		if (otpVerified) {
			const passOtp = "yes";
			localStorage.setItem("otpVerified", passOtp);
			timeout = setTimeout(() => {
				dispatch(resetLoginOtp());
				window.location.href = "/dashboard";
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [otpVerified, dispatch, navigate]);

	return (
		<div className="w-full min-h-screen flex items-center justify-center p-6 bg-gray-50">
			<div className="bg-white shadow-lg flex flex-col gap-6 w-full max-w-md p-8 rounded-lg">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-800">OTP Verification</h1>
					<p className="text-gray-500 mt-2">
						Enter the 6-digit code sent to your email address
					</p>
					{email && (
						<p className="text-sm font-medium text-gray-700 mt-1 bg-gray-100 inline-block px-3 py-1 rounded">
							{email}
						</p>
					)}
				</div>

				<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-2">
						<label htmlFor="otp" className="text-sm font-medium text-gray-700">
							Verification Code
						</label>
						<input
							type="text"
							className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
							name="otp"
							value={form.otp}
							onChange={handleInput}
							pattern="[0-9]{6}"
							maxLength={6}
							required
							placeholder="Enter 6-digit code"
							autoComplete="off"
						/>
						<p className="text-xs text-gray-500">
							Please enter the 6-digit code sent to your email
						</p>
					</div>

					<button
						type="submit"
						disabled={isDisabled}
						className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
							isDisabled
								? "bg-gray-400 cursor-not-allowed"
								: "bg-green-600 hover:bg-green-700"
						}`}
					>
						Verify Code
					</button>

					<div className="text-center text-sm text-gray-600">
						Didn't receive the code?{" "}
						<button
							type="button"
							onClick={() => {
								if (!otpSent) {
									dispatch(getLoginCode(data));
									setOtpSent(true);
								}
							}}
							className="text-green-600 font-medium hover:text-green-700 hover:underline focus:outline-none"
							disabled={otpSent}
						>
							Resend Code
						</button>
					</div>
				</form>
			</div>

			{/* Status Modals */}
			{otpLoading && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<Loader text={"Sending OTP..."} />
				</div>
			)}
			{error && (
				<Error
					error="Invalid OTP code. Please try again."
					onClose={() => setError(null)}
					duration={5000}
				/>
			)}
			{otpVerified && (
				<Success
					text="OTP successfully verified!"
					onClose={() => setOtpVerified(false)}
					duration={3000}
				/>
			)}
		</div>
	);
};

export default Otplogin;
