import React from "react";
import { Link } from "react-router-dom";

const ActionBtn = ({ icon, title, path }) => {
  return (
    <Link
      to={path}
      className="flex flex-col items-center texts-[#347338] px-3 py-3 rounded-md w-20"
    >
      {icon}
      <small className="font-light text-[10px]">{title}</small>
    </Link>
  );
};

export default ActionBtn;
