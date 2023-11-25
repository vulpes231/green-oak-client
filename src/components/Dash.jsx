import React from "react";
// import Account from "./Account";

const Dash = ({ accts }) => {
  return (
    <div className="">
      <h3 className="text-2xl mb-5">Account Summary</h3>
      <p className="font-semibold text-[#347388]">Deposit Accounts</p>
      <div className="grid grid-cols-3 bg-[#f2f2f2] px-4 py-2 font-semibold">
        <h3>Account</h3>
        <h3>Number</h3>
        <h3>Balance</h3>
      </div>
      <div className="px-4 pt-4">{accts}</div>
    </div>
  );
};

export default Dash;
