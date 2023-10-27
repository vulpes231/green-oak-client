import React, { useState } from "react";
import { FaArrowRight, FaEye, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { AnimatedInput, LoginFooter } from "../components";
import WithStyles from "../hoc/WithStyles";

const Login = () => {
  const [error, setError] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [active, setActive] = useState(false);

  const [form, setForm] = useState({
    user: "",
    pass: "",
  });

  function animateInput(e) {
    e.target = setActive((prev) => !prev);
  }

  function handleToggle() {
    setToggled((prev) => !prev);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const myType = !toggled ? "password" : "text";

  function handleUserLogin(e) {
    e.preventDefault();
    console.log(form);
  }

  return (
    <section className=" w-full min-h-screen p-6 text-[#333] bg-[#F2F2F2] flex flex-col justify-between  ">
      <div className="w-full md:max-w-[600px] mx-auto flex flex-col gap-10 items-center">
        <article className="flex items-center gap-2 mt-10 md:mt-24">
          <img src={logo} alt="log-image" width={40} />
          <Link to="/" className="text-2xl font-bold">
            Green<span>Oak</span>
          </Link>
        </article>
        <span className="flex items-center gap-2 font-light">
          <FaLock /> Secure Log In
        </span>
        {/* error */}
        <article className={!error ? "hidden" : ""}></article>

        {/* form */}
        <form
          onSubmit={handleUserLogin}
          className="w-full flex flex-col gap-8 font-light"
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
          <button className="bg-[#347338] p-3 text-[#fff] rounded-lg">
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
