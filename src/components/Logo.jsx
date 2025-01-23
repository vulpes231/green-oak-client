import React from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center gap-1 mt-10 md:mt-24">
      <img src={logo} alt="log-image" width={40} />
      <Link to="/" className="text-2xl font-bold text-[#347338]">
        Regent<span className="text-[#333]">Oak</span>
      </Link>
    </div>
  );
};

export default Logo;
