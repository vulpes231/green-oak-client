import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { AnimatedInput, LoginFooter } from "../components";
import { FaArrowRight } from "react-icons/fa";
import {
  HiOutlineDocumentText,
  HiOutlineKey,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUser,
  HiOutlineUserCircle,
} from "react-icons/hi";
import WithStyles from "../hoc/WithStyles";

const SignUp = () => {
  const initialState = {
    fullname: "",
    gender: "",
    dob: "",
    username: "",
    password: "",
    email: "",
    address: "",
    phone: "",
    account_type: "",
  };

  const [form, setForm] = useState(initialState);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
    resetForm();
  }

  function resetForm() {
    setForm(initialState);
  }

  //   const myType = !toggled ? "password" : "text";

  return (
    <section className="w-full min-h-screen p-6 text-[#333] bg-[#F2F2F2]   ">
      {/* <div className="background-opacity"></div> */}
      <div className="w-full md:max-w-[700px] mx-auto flex flex-col  items-center z-40">
        <article className="flex flex-col gap-3 items-center md:bg-[#fff] w-full">
          <div className="flex items-center gap-2 mt-10 md:mt-24">
            <img src={logo} alt="log-image" width={40} />
            <Link to="/" className="text-3xl md:text-5xl font-bold ">
              Green<span className="text-[#347388]">Oak</span>
            </Link>
          </div>
          <p className="capitalize font-light mb-10 text-center md:text-lg">
            Become a member today by completing the form below
          </p>
        </article>

        {/* signup form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 font-light w-full md:bg-[#fff] md:p-10 "
        >
          {/* personal information */}
          <h4 className="text-[#347388] text-lg md:text-xl font-semibold">
            Personal Information
          </h4>
          <div className="flex flex-col md:flex-row md:justify-between gap-4 ">
            {/* fullname */}
            <span className="flex flex-col w-full">
              <label htmlFor="fullname">Full Name</label>
              <div className="flex items-center">
                <HiOutlineUserCircle className="bg-[#347388] text-5xl p-3 text-white md:h-14" />
                <AnimatedInput
                  type="text"
                  value={form.fullname}
                  onChange={handleInputChange}
                  name="fullname"
                />
              </div>
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            {/* username */}
            <span className="flex flex-col w-full">
              <label htmlFor="username">Username</label>
              <div className="flex items-center">
                <HiOutlineUser className="bg-[#347388] text-5xl p-3 text-white md:h-14" />
                <AnimatedInput
                  type="text"
                  value={form.username}
                  onChange={handleInputChange}
                  name="username"
                />
              </div>
            </span>
            {/* password */}
            <span className="flex flex-col w-full">
              <label htmlFor="password">Password</label>
              <div className="flex items-center">
                <HiOutlineKey className="bg-[#347388] text-5xl p-3 text-white md:h-14" />
                <AnimatedInput
                  type="password"
                  value={form.password}
                  onChange={handleInputChange}
                  name="password"
                />
              </div>
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            {/* gender */}
            <span className="flex flex-col w-full">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleInputChange}
                className="md:py-4 md:px-3 p-3  border border-[#347338]"
              >
                <option value="" defaultChecked={true}>
                  Choose gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </span>
            {/* date of birth */}
            <span className="flex flex-col w-full">
              <label htmlFor="dob">DOB</label>
              <div className="flex items-center">
                <HiOutlineDocumentText className="bg-[#347388] text-5xl p-3 text-white md:h-14" />
                <AnimatedInput
                  type="text"
                  value={form.dob}
                  onChange={handleInputChange}
                  name="dob"
                  placeholder="dd/mm/yyyy"
                />
              </div>
            </span>
          </div>
          {/* ====================================== */}
          {/* account information */}
          <h4 className="text-[#347388] text-lg font-semibold mt-10 md:text-xl">
            Account Information
          </h4>
          <span className="flex flex-col w-full">
            <label htmlFor="account_type">Account Type</label>
            <select
              name="account_type"
              value={form.account_type}
              onChange={handleInputChange}
              className="md:py-4 md:px-3 p-3 border border-[#347338]"
            >
              <option value="" defaultChecked={true}>
                select account
              </option>
              <option value="checkings">Checking Account</option>
              <option value="savings">Savings Account</option>
              <option value="mortgage">Mortgage Account</option>
            </select>
          </span>
          {/* ====================================== */}
          {/* contact information */}
          <h4 className="text-[#347388] text-lg font-semibold mt-10 md:text-xl">
            Contact Information
          </h4>

          <span className="flex flex-col w-full">
            <label htmlFor="address">Address</label>

            <div className="flex items-center">
              <HiOutlineLocationMarker className="bg-[#347388] text-5xl p-3 text-white md:h-14" />
              <AnimatedInput
                type="address"
                value={form.address}
                onChange={handleInputChange}
                name="address"
              />
            </div>
          </span>
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <span className="flex flex-col w-full">
              <label htmlFor="phone">Phone</label>
              <div className="flex items-center">
                <HiOutlinePhone className="bg-[#347388] text-5xl p-3 text-white md:h-14" />
                <AnimatedInput
                  type="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  name="phone"
                />
              </div>
            </span>
            {/* email address */}
            <span className="flex flex-col w-full">
              <label htmlFor="email">Email Address</label>
              <div className="flex items-center">
                <HiOutlineMail className="bg-[#347388] text-5xl p-3 text-white md:h-14" />
                <AnimatedInput
                  type="email"
                  value={form.email}
                  onChange={handleInputChange}
                  name="email"
                />
              </div>
            </span>
          </div>

          <button className="bg-[#347338] p-3 text-[#fff] mt-10 w-full md:w-[350px] md:py-4 mx-auto rounded-md md:font-semibold mb-10">
            Create Account
          </button>
          {/* foot area */}
          <article className="font-light flex flex-col items-center">
            <p>Already have an account?</p>
            <span className="text-[#347388] flex items-center gap-2">
              <Link to="/login" className="underline">
                Login Now
              </Link>
              <FaArrowRight />
            </span>
          </article>
        </form>
      </div>
      <LoginFooter />
    </section>
  );
};

export default WithStyles(SignUp);
