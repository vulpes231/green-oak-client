import React from "react";

const Transaction = ({ title, date, amount }) => {
  return (
    <div className="flex justify-between border-b py-4">
      <span className="w-[70%]">
        <h3 className="uppercase font-light text-xs md:text-sm">{title}</h3>
        <p className="font-extralight">{date}</p>
      </span>
      <span className=" whitespace-nowrap text-xs md:text-sm w-[30%]flex justify-end font-light">
        {amount}
      </span>
    </div>
  );
};

export default Transaction;
