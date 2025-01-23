import React from "react";
import { MdDangerous } from "react-icons/md";

const Error = ({ error }) => {
  return (
    <div className="fixed top-[30px] right-4 flex flex-col gap-2 bg-white shadow-md rounded-xl text-sm p-10">
      <span className="text-red-500 font-normal capitalize flex items-center gap-2">
        <MdDangerous />
        {error}
      </span>
    </div>
  );
};

export default Error;
