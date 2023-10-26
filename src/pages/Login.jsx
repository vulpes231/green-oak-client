import React, { useState } from "react";
import { FaArrowRight, FaEye, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { AnimatedInput } from "../components";

const Login = () => {
  const [error, setError] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [active, setActive] = useState(false);

  function animateInput(e) {
    e.target = setActive((prev) => !prev);
  }

  function handleToggle() {
    setToggled((prev) => !prev);
  }

  const myType = !toggled ? "password" : "text";

  return (
    <section className=" w-full min-h-screen p-6 text-[#333] bg-[#F2F2F2] ">
      <div className="w-full md:max-w-[600px] mx-auto flex flex-col gap-10 items-center">
        <article className="flex items-center gap-2 mt-10">
          <img src={logo} alt="log-image" width={40} />
          <h3 className="text-2xl font-bold">
            Green<span>Oak</span>
          </h3>
        </article>
        <span className="flex items-center gap-2 font-light">
          <FaLock /> Secure Log In
        </span>
        {/* error */}
        <article className={!error ? "hidden" : ""}></article>

        {/* form */}
        <form action="" className="w-full flex flex-col gap-6 font-light">
          <div>
            <label htmlFor="" className="flex justify-between items-center">
              Username{" "}
              <Link to="" className="text-[#347338] ">
                Forgot Username
              </Link>
            </label>
            <AnimatedInput type="text" />
          </div>
          <div className="relative">
            <label htmlFor="" className="flex justify-between items-center">
              Password
              <Link to="" className="text-[#347338] ">
                Forgot Password
              </Link>
            </label>
            <AnimatedInput type={myType} />
            <FaEye className="absolute right-2 top-9" onClick={handleToggle} />
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
    </section>
  );
};

export default Login;
