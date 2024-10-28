import React from "react";
import {
  footerAbout,
  footerHelp,
  navLinks,
  footerLinks,
} from "../constants/index";
import { logo } from "../assets/index";
import {
  FaTwitch,
  FaTwitterSquare,
  FaReddit,
  FaPinterest,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const footNavLinks = footerLinks.map((lnk) => {
    return (
      <div className="flex flex-col gap-2 w-full" key={lnk.id}>
        <h3 className="font-bold uppercase">{lnk.name}</h3>
        <ul className="list-disc capitalize pl-6 font-light whitespace-nowrap text-sm text-slate-400 lg:text-md flex flex-col gap-1">
          {lnk.sublinks.map((lk, index) => {
            return <li key={index}>{lk}</li>;
          })}
        </ul>
      </div>
    );
  });

  const navigate = useNavigate();

  function goToSignUp() {
    navigate("/signup");
  }

  return (
    <footer className="font-[Roboto] bg-slate-800 text-white">
      <div className="w-full lg:max-w-[1200px] lg:mx-auto grid lg:grid-cols-2 gap-6 px-6 py-12">
        <div className="flex flex-col gap-3">
          <figure className="flex items-center gap-1">
            <img src={logo} alt="logo-image" width={50} />
            <h1 className="text-3xl font-semibold">
              Green<span className="text-[#347338]">Oak</span>
            </h1>
          </figure>
          <h4 className="font-semibold capitalize">
            Customer service line:{" "}
            <small className="font-light">800-321-9807</small>
          </h4>
          <address className=" ">
            Corporate offices:
            <small className="font-light">
              (Not open to the public. No branches or ATMs) <br />
              11545 W. Touhy Ave, Chicago, IL 60666
            </small>
          </address>
        </div>

        {/* links */}
        <div className="grid lg:grid-cols-3 gap-10 w-full ">{footNavLinks}</div>
      </div>
      <div className="flex flex-col lg:items-center lg:justify-center gap-3 bg-slate-950 px-6 py-12">
        <div className="flex gap-4">
          <FaPinterest className="text-2xl text-pink-500" />
          <FaReddit className="text-2xl text-red-500" />
          <FaTwitch className="text-2xl text-cyan-500" />
        </div>
        <button
          onClick={goToSignUp}
          className="bg-[#347338] py-2.5 px-6 rounded-3xl font-medium"
        >
          Become a member today
        </button>
        <small className="text-slate-400">
          Copyright &copy; 2024 GreenOakTrust Bank. All Rights Reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
