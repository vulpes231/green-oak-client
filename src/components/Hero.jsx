import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative p-6 lg:p-16 font-[Roboto] text-[#333] leading-10 bg-slate-50">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:max-w-[1100px] lg:mx-auto">
        <div className="flex flex-col gap-6 md:gap-8 p-8 w-full ">
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight z-40 md:text-3xl lg:text-5xl ">
            Sit Back, Relax &amp; Earn a Higher Rate
          </h3>
          <p className="font-bold text-lg">
            Lock in 5.30% APY with a 12-Month Jumbo Certificate.
          </p>
          <span>
            <Link className="bg-[#347338] px-8 py-3 font-[Inter] text-[#fff] font-medium text-sm rounded-3xl">
              Get Started
            </Link>
          </span>
        </div>
        <div className="hidden lg:flex w-full">
          <img src="" alt="finance-cashier" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
