import React, { useState } from "react";
import { logo } from "../assets/";
import { HiMenu, HiMenuAlt1 } from "react-icons/hi";
import { navLinks } from "../constants";

import { motion } from "framer-motion";

const Header = () => {
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

  return (
    <header
      className={`fixed top-0 w-full h-[80px] p-4 bg-[#F2F2F2] grid content-center z-1`}
    >
      <nav className="flex justify-between items-center">
        {/* logo */}
        <span className="flex justify-between items-center gap-2">
          <img src={logo} alt="" width={30} />
          <h1>GreenOak</h1>
        </span>

        {/* monbile links */}
        <motion.ul
          className={
            toggle
              ? "flex flex-col bg-[#F2F2F2] absolute top-[80px] left-0 w-full items-center gap-4 pb-10"
              : "hidden"
          }
        >
          {links}
        </motion.ul>

        {/* menu button */}
        <span onClick={handleToggle}>
          {!toggle ? <HiMenu /> : <HiMenuAlt1 />}
        </span>
      </nav>
    </header>
  );
};

export default Header;
