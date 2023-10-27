import React from "react";
import { eql } from "../assets";

const LoginFooter = () => {
  return (
    <article className="flex flex-col gap-4 text-[#333] mt-24 md:flex-row-reverse items-center lg:hidden">
      <h4 className="text-light text-xs text-center md:text-left">
        GreenOak , Chicago IL. Your savings federally insured to at least
        $250,000 and backed by the full faith and credit of United State
        Government - National Credit Union Administration (NCUA) a U.S
        Government agency Ver. 1.0.0.0
      </h4>
      <div className="flex gap-4 w-full">
        <figure className="w-[50%]">
          <img src={eql} alt="equal-lender-image" className="lg:w-[100px]" />
        </figure>

        <div className="border border-[#333] p-3 w-[50%] leading-3 flex flex-col gap-1 md:hidden">
          <small className="font-light text-xs ">
            Your savings federally insured to at least $250,000 and backed by
            the full faith and credit of United State Government
          </small>
          <h1 className="font-bold">NCUA</h1>
          <small className="font-light text-xs">A U.S Government agency</small>
        </div>
      </div>
    </article>
  );
};

export default LoginFooter;
