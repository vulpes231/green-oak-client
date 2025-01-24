import React, { useState, useEffect } from "react";
import { FaArrowRight, FaEye, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AnimatedInput, Error, Loader, Footer, Logo } from "../components";
import WithStyles from "../hoc/WithStyles";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

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

    const reqBody = {
      username: form.username,
      password: form.password,
    };

    dispatch(loginUser(reqBody));
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
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    if (accessToken && email) {
      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("username", username);
      resetInput();
      navigate("/verifylogin");
    }
  }, [accessToken, email, username]);

  return (
    <section className=" w-full h-screen  text-[#333] flex flex-col bg-slate-50 font-[Inter]">
      <div className="w-full md:max-w-[450px] mx-auto flex flex-col gap-2 items-center p-6">
        <Logo />
        <span className="flex items-center gap-2 font-light">
          <FaLock /> Secure Log In
        </span>

        {/* form */}
        <form
          onSubmit={handleUserLogin}
          className="w-full flex flex-col gap-6 font-light md:bg-[#fff] md:p-10 md:rounded-md md:shadow-md mt-5"
        >
          <div>
            <label
              htmlFor=""
              className="flex justify-between items-center mb-1 text-sm font-medium"
            >
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
            <label
              htmlFor=""
              className="flex justify-between items-center mb-1 text-sm font-medium"
            >
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
            <Link to="" className="text-[#347338] font-light underline text-xs">
              Forgot Password
            </Link>
          </div>
          <button className="bg-[#347338] p-3 text-[#fff] rounded-3xl font-medium font-[Roboto]">
            Sign In
          </button>
          <div className="flex justify-between text-xs font-light">
            <h4>Don't have an account?</h4>
            <Link
              to="/signup"
              className="underline text-[#347338] flex gap-1 items-center "
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
