import React from "react";

const ActionBtn = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center bg-[#347338] text-[#fff] p-2 rounded-md">
      {icon}
      <p className="font-extralight">{title}</p>
    </div>
  );
};

export default ActionBtn;
