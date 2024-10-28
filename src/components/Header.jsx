import React, { useState } from "react";
import { logo } from "../assets/";
import { HiMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { navLinks } from "../constants";

import { motion } from "framer-motion";
import Button from "./Button";

import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const links = navLinks.map((lnk) => {
    return (
      <li
        className="font-light cursor-pointer hover:text-[#347338]"
        onClick={closeMenu}
        key={lnk.id}
      >
        {lnk.title}
      </li>
    );
  });

  function handleToggle() {
    setToggle((prev) => !prev);
  }

  function closeMenu() {
    setToggle(false);
  }

  function goToLogin() {
    navigate("/login");
  }

  return (
    <header
      className={`fixed top-0 w-full h-[80px] p-4 bg-white grid content-center z-50 text-[#333] shadow-sm`}
    >
      <nav className="flex justify-between items-center lg:max-w-[1100px] lg:mx-auto w-full">
        {/* logo */}
        <Link to="/" className="flex justify-between items-center gap-1">
          <img src={logo} alt="" width={30} />
          <h1 className="text-2xl font-bold font-[Roboto] text-[#347338]">
            Green<span className="text-[#333]">Oak</span>
          </h1>
        </Link>

        {/* monbile links */}
        <motion.ul
          className={
            toggle
              ? "flex flex-col bg-[#fff] absolute top-[80px] right-0 w-[250px] gap-6 py-10 px-7 font-semibold hover:text-[#347338] sm:hidden rounded-bl-lg border border-slate-200"
              : "hidden"
          }
        >
          {links}
          <li>
            <Link
              className="bg-[#347338] text-white font-light px-5 py-2 rounded-md shadow-sm"
              to={"/signin"}
            >
              Sign In
            </Link>
          </li>
        </motion.ul>

        {/* desktop links */}
        <motion.ul className="hidden md:flex gap-6">{links}</motion.ul>

        <div className="flex items-center gap-1">
          {/* join button */}
          {!toggle && (
            <Button
              title="Sign In"
              className="bg-[#347338] px-5 py-1.5 rounded-sm text-[#fff] font-light text-sm"
              onClick={goToLogin}
            />
          )}

          {/* menu button */}
          <span onClick={handleToggle} className="sm:hidden text-2xl font-bold">
            {!toggle ? <HiMenu /> : <MdClose />}
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
