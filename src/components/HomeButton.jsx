import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

const HomeButton = () => {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className="flex items-center justify-between">
      <Link to="/dashboard" className="text-xl pb-5 lg:hidden">
        <FaHome className="text-xl cursor-pointer" />
      </Link>
      <Link to="" className="text-xl pb-5 lg:hidden" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
};

export default HomeButton;
