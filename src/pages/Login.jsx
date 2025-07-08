import React, { useState, useEffect } from "react";
import { FaArrowRight, FaEye, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AnimatedInput, Error, Loader, Footer, Logo } from "../components";
import WithStyles from "../hoc/WithStyles";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetLogin } from "../features/auth/authSlice";
import { format } from "date-fns";

const styles = {
	label: "text-[13px] md:text-[14px] text-[#979797] capitalize",
	link: "text-[12px] text-[#347338]",
	// input: "text-[16px] font-normal rounded-[5px]",
};

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialState = {
		username: "",
		password: "",
	};
	const [form, setForm] = useState(initialState);

	const [toggled, setToggled] = useState(false);
	const [error, setError] = useState("");

	const { loginLoading, accessToken, email, username, loginError } =
		useSelector((state) => state.auth);

	const myType = !toggled ? "password" : "text";

	function handleToggle() {
		setToggled((prev) => !prev);
	}

	function resetInput() {
		setForm(initialState);
	}

	function handleInputChange(e) {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	async function handleUserLogin(e) {
		e.preventDefault();
		setError("");

		for (const key in form) {
			if (form[key] === "") {
				setError(`${key} required!`);
				return;
			}
		}

		const data = {
			username: form.username,
			password: form.password,
		};
		console.log(data);

		dispatch(loginUser(data));
	}

	useEffect(() => {
		document.title = "RegentOak - Sign In";
	}, []);

	useEffect(() => {
		if (loginError) {
			setError(loginError);
		}
	}, [loginError]);

	useEffect(() => {
		let timeout;
		if (error) {
			timeout = setTimeout(() => {
				dispatch(resetLogin());
				setError("");
			}, 3000);
		}
		return () => clearTimeout(timeout);
	}, [error, dispatch]);

	const curDate = format(new Date(), "dd MMM, yyyy");
	const curTime = format(new Date(), "hh:mm a");

	useEffect(() => {
		if (accessToken && email) {
			sessionStorage.setItem("token", accessToken);
			sessionStorage.setItem("email", email);
			sessionStorage.setItem("username", username);

			sessionStorage.setItem("loginDate", curDate);
			sessionStorage.setItem("loginTime", curTime);
			resetInput();
			dispatch(resetLogin());
			navigate("/verifylogin");
		}
	}, [accessToken, email, username]);

	return (
		<section className=" w-full h-screen  text-[#333] flex flex-col bg-slate-200 font-[Inter]">
			<div className="w-full md:max-w-[450px] mx-auto flex flex-col gap-2 items-center p-6 md:p-0">
				<Logo />
				<span className="flex items-center gap-2 font-normal">
					<FaLock /> Secure Log In
				</span>

				{/* form */}
				<form
					onSubmit={handleUserLogin}
					className="w-full flex flex-col gap-[10px] bg-[#fff] text-[#505050] rounded-[10px] p-6 mt-[20px]"
				>
					<div>
						<label htmlFor="" className={styles.label}>
							Username
						</label>
						<AnimatedInput
							type="text"
							value={form.username}
							onChange={handleInputChange}
							name="username"
						/>
					</div>

					<div className="relative">
						<label htmlFor="" className={styles.label}>
							Password
						</label>
						<AnimatedInput
							type={myType}
							value={form.password}
							onChange={handleInputChange}
							name="password"
						/>
						<FaEye
							className="absolute right-3 top-[55%] cursor-pointer"
							onClick={handleToggle}
						/>
					</div>

					<div className="flex justify-end">
						<Link to="" className={styles.link}>
							Forgot Password
						</Link>
					</div>
					<button className="bg-[#347338] p-2 text-[#fff] rounded-[5px] font-medium md:font-semibold font-[Roboto] mt-[26px] ">
						Sign In
					</button>
					<div className="flex justify-between py-2">
						<h6 className="text-[14px]">Don't have an account?</h6>
						<Link
							to="/signup"
							className={`${styles.link} flex items-center gap-2`}
						>
							Enroll Now <FaArrowRight />
						</Link>
					</div>
				</form>
				{loginLoading && <Loader text={"Logging in..."} />}
				{error && <Error error={error} />}
			</div>
			{/* <Footer /> */}
		</section>
	);
};

export default WithStyles(Login);
