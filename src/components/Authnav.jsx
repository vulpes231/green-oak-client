import React, { useState } from "react";
import { FaUser, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Authnav = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div className="flex w-full lg:hidden">
      <button onClick={handleToggle} className="flex justify-end w-full p-5">
        <FaUserAlt className="border rounded-full border-[#979797]/30 w-[30px] h-[30px] p-1" />
      </button>

      {toggle && (
        <div className="flex flex-col gap-5 absolute top-[80px] right-[10px] w-[220px] bg-[#fff] rounded-[10px] shadow-lg p-4 text-[14px] text-[#505050] z-[100]">
          <div className="flex items-center gap-6">
            <FaUserAlt className="border rounded-full border-[#979797]/20 w-[30px] h-[30px] p-1" />
            <h3 className="font-semibold text-[16px]">Hi, User</h3>
          </div>
          <hr className="border-[0.5px] border-[#979797]/10" />
          <Link
            to={"/dashboard"}
            onClick={() => {
              setToggle(false);
            }}
          >
            Dashboard
          </Link>
          <Link
            to={"/profile"}
            onClick={() => {
              setToggle(false);
            }}
          >
            Profile
          </Link>
          <Link
            to={"/contact"}
            onClick={() => {
              setToggle(false);
            }}
          >
            Help
          </Link>
          <button className="bg-[#347338] h-[38px] rounded-[5px] text-[#fff]">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Authnav;
