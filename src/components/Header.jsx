import React, { useState } from "react";
import { logo } from "../assets/";
import { HiMenu, HiMenuAlt1 } from "react-icons/hi";
import { navLinks } from "../constants";

import { motion } from "framer-motion";
import Button from "./Button";

import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const links = navLinks.map((lnk) => {
    return (
      <li onClick={closeMenu} key={lnk.id}>
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
      className={`fixed top-0 w-full h-[80px] p-4 bg-[#F2F2F2] grid content-center z-50 text-[#333]`}
    >
      <nav className="flex justify-between items-center">
        {/* logo */}
        <Link to="/" className="flex justify-between items-center gap-2">
          <img src={logo} alt="" width={30} />
          <h1 className="text-2xl font-bold">
            Green<span className="text-[#347338]">Oak</span>
          </h1>
        </Link>

        {/* monbile links */}
        <motion.ul
          className={
            toggle
              ? "flex flex-col justify-center bg-[#F2F2F2] absolute top-[80px] left-0 w-full min-h-screen items-center gap-4 pb-24 font-semibold hover:text-[#347338]"
              : "hidden"
          }
        >
          {links}
        </motion.ul>

        {/* desktop links */}
        <motion.ul className="hidden md:flex gap-4">{links}</motion.ul>

        {/* join button */}
        {!toggle && (
          <Button
            title="Log In"
            className="bg-[#347338] px-8 py-2 text-[#fff] rounded-md"
            onClick={goToLogin}
          />
        )}

        {/* menu button */}
        <span onClick={handleToggle} className="sm:hidden text-2xl font-bold">
          {!toggle ? <HiMenu /> : <HiMenuAlt1 />}
        </span>
      </nav>
    </header>
  );
};

export default Header;
