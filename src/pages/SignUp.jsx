import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { AnimatedInput, LoginFooter } from "../components";
import { FaArrowRight } from "react-icons/fa";

const SignUp = () => {
  const [toggled, setToggled] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: "",
    address: "",
    phone: "",
    account_type: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
  }

  //   const myType = !toggled ? "password" : "text";

  return (
    <section className="w-full min-h-screen p-6 text-[#333] bg-[#F2F2F2]">
      <div className="w-full md:max-w-[600px] mx-auto flex flex-col gap-10 items-center">
        <article className="flex items-center gap-2 mt-10 md:mt-24">
          <img src={logo} alt="log-image" width={40} />
          <h3 className="text-2xl font-bold">
            Green<span>Oak</span>
          </h3>
        </article>
        <article className="text-center">
          <p>Become a member today by completing the form below</p>
        </article>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 font-light w-full"
        >
          <div className="flex flex-col md:flex-row md:justify-between gap-4 ">
            <span className="flex flex-col w-full">
              <label htmlFor="firstname">First Name</label>
              <AnimatedInput
                type="text"
                value={form.firstname}
                onChange={handleInputChange}
                name="firstname"
              />
            </span>
            <span className="flex flex-col w-full">
              <label htmlFor="lastname">Last Name</label>
              <AnimatedInput
                type="text"
                value={form.lastname}
                onChange={handleInputChange}
                name="lastname"
              />
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <span className="flex flex-col w-full">
              <label htmlFor="username">Username</label>
              <AnimatedInput
                type="text"
                value={form.username}
                onChange={handleInputChange}
                name="username"
              />
            </span>
            <span className="flex flex-col w-full">
              <label htmlFor="password">Password</label>
              <AnimatedInput
                type="password"
                value={form.password}
                onChange={handleInputChange}
                name="password"
              />
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <span className="flex flex-col w-full">
              <label htmlFor="email">Email</label>
              <AnimatedInput
                type="email"
                value={form.email}
                onChange={handleInputChange}
                name="email"
              />
            </span>
            <span className="flex flex-col w-full">
              <label htmlFor="phone">Phone</label>
              <AnimatedInput
                type="text"
                value={form.phone}
                onChange={handleInputChange}
                name="phone"
              />
            </span>
          </div>

          <span className="flex flex-col w-full">
            <label htmlFor="address">Address</label>
            <AnimatedInput
              type="address"
              value={form.address}
              onChange={handleInputChange}
              name="address"
            />
          </span>
          <span className="flex flex-col w-full">
            <label htmlFor="account_type">Account Type</label>
            <select
              name="account_type"
              value={form.account_type}
              onChange={handleInputChange}
            >
              <option value="">select account</option>
              <option value="checkings">Checking Account</option>
              <option value="savings">Savings Account</option>
              <option value="mortgage">Mortgage Account</option>
            </select>
          </span>
          <button className="bg-[#347338] p-3 text-[#fff]">
            Create Account
          </button>
        </form>
        <article className="font-light flex flex-col items-center">
          <p>Already have an account?</p>
          <span className="text-[#347388] flex items-center gap-2">
            <Link to="/login" className="underline">
              Login Now
            </Link>
            <FaArrowRight />
          </span>
        </article>
      </div>
      <LoginFooter />
    </section>
  );
};

export default SignUp;
