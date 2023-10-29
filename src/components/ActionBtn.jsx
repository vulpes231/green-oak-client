import React from "react";
import { Link } from "react-router-dom";

const ActionBtn = ({ icon, title, path }) => {
  return (
    <Link
      to={path}
      className="flex flex-col items-center bg-[#347338] text-[#fff] p-2 rounded-md"
    >
      {icon}
      <p className="font-extralight">{title}</p>
    </Link>
  );
};

export default ActionBtn;
