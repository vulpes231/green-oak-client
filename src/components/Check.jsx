import React from "react";
import { HiCamera } from "react-icons/hi";

const Check = ({ title }) => {
  return (
    <article>
      <p className="text-center">{title}</p>
      <div className="border border-[#347338] py-6 flex justify-center rounded-sm">
        <HiCamera className="text-xl" />
      </div>
    </article>
  );
};

export default Check;
