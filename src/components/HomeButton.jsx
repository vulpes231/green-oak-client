import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const HomeButton = () => {
  return (
    <Link to="/dashboard" className="text-xl pb-5 lg:hidden">
      <FaHome className="text-xl cursor-pointer" />
    </Link>
  );
};

export default HomeButton;
