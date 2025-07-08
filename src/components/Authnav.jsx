import React, { useEffect, useState } from "react";
import { FaUser, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, resetLogout } from "../features/user/logoutSlice";
import Loader from "./Loader";
import Success from "./Success";

const Authnav = () => {
	const dispatch = useDispatch();
	const [toggle, setToggle] = useState(false);
	const [error, setError] = useState("");

	const { logoutLoading, logoutError, loggedOut } = useSelector(
		(state) => state.logout
	);

	const handleToggle = () => {
		setToggle((prev) => !prev);
	};

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logoutUser());
	};

	useEffect(() => {
		if (logoutError) {
			setError(logoutError);
		}
	}, [logoutError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetLogout());
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error, dispatch]);

	useEffect(() => {
		let timeout;
		if (loggedOut) {
			timeout = setTimeout(() => {
				dispatch(resetLogout());
				sessionStorage.clear();
				localStorage.clear();
				window.location.href = "/login";
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [loggedOut, dispatch]);

	return (
		<div className={`w-full lg:hidden flex`}>
			<button onClick={handleToggle} className="flex justify-end w-full p-5">
				<FaUserAlt className="border rounded-full border-[#979797]/30 w-[30px] h-[30px] p-1" />
			</button>

			<div>
				{toggle && (
					<div className="flex flex-col gap-5 absolute top-[80px] right-[10px] w-[220px] bg-[#fff] rounded-[10px] shadow-lg p-4 text-[14px] text-[#505050] z-[100]">
						<div className="flex items-center gap-6">
							<FaUserAlt className="border rounded-full border-[#979797]/20 w-[30px] h-[30px] p-1" />
							<h3 className="font-semibold text-[16px]">Hi, User</h3>
						</div>
						<hr className="border-[0.5px] border-[#979797]/10" />
						<Link
							to={"/dashboard"}
							onClick={() => {
								setToggle(false);
							}}
						>
							Dashboard
						</Link>
						<Link
							to={"/profile"}
							onClick={() => {
								setToggle(false);
							}}
						>
							Profile
						</Link>
						<Link
							to={"/contact"}
							onClick={() => {
								setToggle(false);
							}}
						>
							Help
						</Link>
						<button
							onClick={(e) => {
								handleLogout(e);
								setToggle(false);
							}}
							className="bg-[#347338] h-[38px] rounded-[5px] text-[#fff]"
						>
							Logout
						</button>
					</div>
				)}
			</div>

			{logoutLoading && <Loader text={"Logging Out..."} />}
			{loggedOut && (
				<Success
					text="Logged out."
					onClose={() => dispatch(resetLogout())}
					duration={3000}
				/>
			)}
			{error && (
				<Error text={error} onClose={() => setError("")} duration={3000} />
			)}
		</div>
	);
};

export default Authnav;
