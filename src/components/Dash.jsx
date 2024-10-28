import React from "react";
// import Account from "./Account";

const Dash = ({ accts }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-medium bg-white p-4 rounded-lg shadow-sm">
        Dashboard
      </h3>
      <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col gap-4">
        <h3 className="text-xl font-medium">Accounts</h3>
        <div className="">{accts}</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col gap-4">
        <h3 className="text-xl font-medium">Recent Activities</h3>
      </div>
    </div>
  );
};

export default Dash;
