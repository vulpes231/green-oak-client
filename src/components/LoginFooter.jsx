import React from "react";
import { eql } from "../assets";

const LoginFooter = () => {
  return (
    <article className="flex flex-col gap-4 text-[#333] mt-24 md:flex-row-reverse items-start md:max-w-[700px] mx-auto">
      <h4 className="text-light text-xs text-center md:text-left w-full">
        GreenOak , Chicago IL. Your savings federally insured to at least
        $250,000 and backed by the full faith and credit of United State
        Government - National Credit Union Administration (NCUA) a U.S
        Government agency Ver. 1.0.0.0
      </h4>
      <div className="flex gap-4 w-full ">
        <figure className="w-full">
          <img src={eql} alt="equal-lender-image" className="lg:w-[300px]" />
        </figure>

        <div className="w-full border-2 p-3">
          <p className="font-light text-xs leading-3 ">
            Your savings federally insured to at least $250,000 and backed by
            the full faith and credit of United State Government
          </p>
          <h1 className="font-bold">NCUA</h1>
          <p className="font-light text-xs leading-3 ">
            A U.S Government agency
          </p>
        </div>
      </div>
    </article>
  );
};

export default LoginFooter;
