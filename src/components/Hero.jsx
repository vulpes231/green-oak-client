import React from "react";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="hero relative p-6 flex flex-col justify-center gap-6 md:gap-6 items-center text-center ">
      <div className="absolute bg-[#347338] w-full h-full left-0 opacity-30 -z-0"></div>
      <h4 className="text-2xl sm:text-3xl font-bold capitalize tracking-tight leading-7 text-white z-40 md:text-3xl lg:text-5xl ">
        Sit back and relax and earn a higher rate
      </h4>
      <h3 className="text-xl sm:text-3xl  text-[#333] tracking-tight leading-5 z-40 p-2 rounded-md ">
        Lock in 5.30% APY with a 12-month jumbo certificate.
      </h3>
      <Button
        title="Learn more"
        className="bg-[#347338] px-8 py-3 md:py-5 text-[#fff] rounded-md mb-6 w-[150px] md:w-[250px] whitespace-nowrap z-40 lg:text-lg"
      />
    </section>
  );
};

export default Hero;
