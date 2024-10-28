import React from "react";
import { eql, fdcic } from "../assets";

const LoginFooter = () => {
  return (
    <div className="text-slate-800 bg-slate-200 px-6 py-12 mt-20 shadow-md">
      <div className="grid md:grid-cols-2 md:max-w-[800px] md:mx-auto gap-10">
        <figure className="w-full flex">
          <img src={fdcic} alt="equal-lender-image" className="w-full" />
        </figure>
        <div className="flex flex-col gap-4 w-full  ">
          <small className="font-medium text-xs w-full leading-5 ">
            GreenOakTrust , Chicago IL. Your savings federally insured to at
            least $250,000 and backed by the full faith and credit of United
            State Government - National Credit Union Administration (NCUA) a U.S
            Government agency Ver. 1.0.0.0
          </small>

          <div className="w-full border-2 border-slate-900 p-3">
            <small className="font-light text-xs leading-5  ">
              Your savings federally insured to at least $250,000 and backed by
              the full faith and credit of United State Government
            </small>
            <p className="font-bold">NCUA</p>
            <p className="font-light text-xs leading-3 ">
              A U.S Government agency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;
