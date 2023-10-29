import React from "react";
import Account from "./Account";

const Dash = () => {
  return (
    <div className="">
      <h3 className="text-2xl mb-5">Account Summary</h3>
      <p className="font-semibold text-[#347388]">Deposit Accounts</p>
      <div className="grid grid-cols-4 bg-[#f2f2f2] px-4 py-2">
        <h3>Account</h3>
        <h3>Number</h3>
        <h3>Balance</h3>
        <h3>Effective Date</h3>
      </div>
      <div className="px-4 pt-4">
        <Account
          title="Checking"
          number="XXXXXX1234"
          balance="244.56"
          date="07/27/2023"
        />
        <Account
          title="Savings"
          number="XXXXXX5678"
          balance="400.56"
          date="07/27/2023"
        />
        <Account
          title="Mortgage & Loans"
          number="XXXXXX9012"
          balance="14,600.41"
          date="03/12/2023"
        />
      </div>
    </div>
  );
};

export default Dash;
