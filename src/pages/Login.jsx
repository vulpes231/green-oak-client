import React, { useState } from "react";
import { FaArrowRight, FaEye, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { AnimatedInput, Error, LoginFooter } from "../components";
import WithStyles from "../hoc/WithStyles";

const Login = () => {
  const initialState = {
    user: "",
    pass: "",
  };

  const [error, setError] = useState("");
  const [toggled, setToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialState);

  const navigate = useNavigate();

  function handleToggle() {
    setToggled((prev) => !prev);
  }

  function resetInput() {
    console.log("resetting input");
    setForm(initialState);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const myType = !toggled ? "password" : "text";

  async function handleUserLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};

    if (!form.user) {
      newErrors.user = "Username is required!";
    }

    if (form.user.length < 4) {
      newErrors.user = "Username must be greater than 6 characters!";
    }

    if (!form.pass) {
      newErrors.pass = "Password is required!";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const reqBody = {
          username: form.user,
          password: form.pass,
        };
        const reqOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
          credentials: "include",
        };

        const url = "http://localhost:3500/auth";
        const response = await fetch(url, reqOptions);

        if (response.ok) {
          const data = await response.json();
          const accessToken = data.accessToken;
          // localStorage.setItem("accessToken", accessToken);
        } else {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsLoading(false);
    }
  }

  return (
    <section className=" w-full min-h-screen p-6 text-[#333] bg-[#F2F2F2] flex flex-col justify-between  ">
      <div className="w-full md:max-w-[500px] mx-auto flex flex-col gap-10 items-center">
        <article className="flex items-center gap-2 mt-10 md:mt-24">
          <img src={logo} alt="log-image" width={40} />
          <Link to="/" className="text-2xl font-bold">
            Green<span className="text-[#347338]">Oak</span>
          </Link>
        </article>
        <span className="flex items-center gap-2 font-light">
          <FaLock /> Secure Log In
        </span>

        {/* form */}
        <form
          onSubmit={handleUserLogin}
          className="w-full flex flex-col gap-6 font-light md:bg-[#fff] md:p-10 md:rounded-md md:shadow-md"
        >
          <div>
            <label
              htmlFor=""
              className="flex justify-between items-center mb-1"
            >
              Username
              <Link to="" className="text-[#347338] ">
                Forgot Username
              </Link>
            </label>
            <AnimatedInput
              type="text"
              value={form.username}
              onChange={handleInputChange}
              name="user"
            />
          </div>
          <div className={!error ? "hidden " : "text-red-500 leading-3"}>
            {error.user && <Error error={error.user} />}
          </div>
          <div className="relative">
            <label
              htmlFor=""
              className="flex justify-between items-center mb-1"
            >
              Password
              <Link to="" className="text-[#347338] ">
                Forgot Password
              </Link>
            </label>
            <AnimatedInput
              type={myType}
              value={form.password}
              onChange={handleInputChange}
              name="pass"
            />
            <FaEye className="absolute right-3 top-11" onClick={handleToggle} />
          </div>
          <div className={!error ? "hidden " : "text-red-500 leading-3"}>
            {error.pass && <Error error={error.pass} />}
          </div>

          <button className="bg-[#347338] p-3 text-[#fff] rounded-sm font-semibold">
            Log In
          </button>
        </form>
        <div className="flex flex-col items-center font-light">
          <h4>Don't have an account?</h4>
          <Link
            to="/signup"
            className="underline text-[#347338] flex gap-2 items-center"
          >
            Enroll Now <FaArrowRight />
          </Link>
        </div>
      </div>
      <LoginFooter />
    </section>
  );
};

export default WithStyles(Login);
