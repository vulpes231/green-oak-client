import React from "react";
import { MdCheck } from "react-icons/md";

const Success = ({ text }) => {
  return (
    <div className="fixed top-[30px] right-4 flex flex-col gap-2 bg-white shadow-md rounded-md text-sm p-7">
      <span className="text-green-500 font-normal capitalize flex items-center gap-2">
        <MdCheck />
        {text}
      </span>
    </div>
  );
};

export default Success;
