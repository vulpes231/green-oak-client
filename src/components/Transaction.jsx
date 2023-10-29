import React from "react";

const Transaction = ({ title, date, amount }) => {
  return (
    <div className="flex justify-between border-b py-4">
      <span>
        <h3 className="uppercase font-semibold">{title}</h3>
        <p className="font-extralight">{date}</p>
      </span>
      <span className="font-semibold">{amount}</span>
    </div>
  );
};

export default Transaction;
