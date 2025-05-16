import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ActionBtn = ({ icon, title, path, active, handleClick }) => {
  // console.log(active, title);
  return (
    <Link
      onClick={handleClick}
      to={path}
      className={`flex flex-col items-center px-3 py-3 rounded-md w-20 ${
        active === title.toLowerCase() ? "text-[#347338]" : "text-[#505050]"
      }`}
    >
      {icon}
      <small className="font-light text-[10px] capitalize">{title}</small>
    </Link>
  );
};

export default ActionBtn;
