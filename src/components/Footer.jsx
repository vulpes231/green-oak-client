import React from "react";

import { footerAbout, footerHelp, navLinks } from "../constants/index";
import { logo } from "../assets/index";
import {
  FaTwitch,
  FaTwitterSquare,
  FaReddit,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  const links = navLinks.map((lnk) => {
    return (
      <li className="text-[#347338] underline" key={lnk.id}>
        {lnk.title}
      </li>
    );
  });
  const about = footerAbout.map((lnk) => {
    return (
      <li className="text-[#347338] underline" key={lnk.id}>
        {lnk.title}
      </li>
    );
  });
  const help = footerHelp.map((lnk) => {
    return (
      <li className="text-[#347338] underline" key={lnk.id}>
        {lnk.title}
      </li>
    );
  });
  return (
    <footer className=" flex flex-col gap-8 p-6 lg:flex-row lg:items-start lg:max-w-[1200px] mx-auto text-[#333] ">
      {/* info */}
      <article className="flex flex-col items-center lg:w-[35%] lg:items-start">
        <figure className="flex items-center gap-6">
          <img src={logo} alt="logo-image" width={50} />
          <h1 className="text-3xl font-semibold">
            Green<span className="text-[#347338]">Oak</span>
          </h1>
        </figure>
        <h4 className="font-semibold capitalize">
          Customer service line:{" "}
          <span className="font-normal">800-321-9807</span>
        </h4>
        <address className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className="font-semibold capitalize">Corporate offices:</span>
          <p>
            (Not open to the public. No branches or ATMs) 11545 W. Touhy Ave,
            Chicago, IL 60666
          </p>
        </address>
      </article>

      {/* links */}
      <article className="hidden md:flex justify-between items-start gap-4 lg:w-[46%] px-10 lg:px-0">
        <div>
          <h3 className="text-xl font-semibold">Accounts</h3>
          <ul className="flex flex-col items-center lg:items-start">{links}</ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">About </h3>
          <ul className="flex flex-col items-center lg:items-start">{about}</ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Help &amp; Support</h3>
          <ul className="flex flex-col items-center lg:items-start">{help}</ul>
        </div>
      </article>

      {/* social */}
      <article className="flex flex-col gap-4 items-center  lg:w-[20%]">
        <div className="flex gap-4">
          <FaPinterest className="text-2xl text-[#347338]" />
          <FaReddit className="text-2xl text-[#347338]" />
          <FaTwitch className="text-2xl text-[#347338]" />
        </div>
        <button className="bg-[#347338] py-4 px-6 lg:px-3 text-[#fff] rounded-md ">
          Become a member
        </button>
      </article>
    </footer>
  );
};

export default Footer;
