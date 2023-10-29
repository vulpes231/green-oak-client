import React, { useState } from "react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiMail,
  HiMenu,
  HiOutlineUserCircle,
  HiSearch,
} from "react-icons/hi";
import {
  FaDollarSign,
  FaEllipsisH,
  FaExchangeAlt,
  FaMoneyBill,
} from "react-icons/fa";
import { Account, ActionBtn, Transaction } from "../components";
import { dashLinks } from "../constants";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Dashboard = () => {
  const [activeLink, setActiveLink] = useState(dashLinks[0].id);
  const dLinks = dashLinks.map((dsh) => {
    const isActive = activeLink === dsh.id;

    return (
      <li
        className={
          isActive
            ? "bg-[#fff] text-[#347338] text-lg uppercase rounded-md"
            : "text-lg uppercase border-r-4 border-r-[#347338]"
        }
        key={dsh.id}
      >
        <span
          //   to={dsh.path}
          onClick={() => setActiveLink(dsh.id)} // Set the active link
        >
          {dsh.title}
        </span>
      </li>
    );
  });
  return (
    <section className="p-4 lg:p-0 text-[#333] min-h-screen   ">
      {/* mobile screen */}
      <div className="lg:hidden">
        {/* header */}
        <article className="flex flex-col gap-6 mb-10">
          <HiMenu className="" />
          <div>
            <h3 className="text-2xl">Hi, User</h3>
            <p className="font-extralight">Last login 12:30pm 12/12/2023</p>
          </div>
        </article>
        {/* accoutns */}
        <article className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>Accounts</p>
            <FaEllipsisH />
          </div>
          <div className="flex justify-between items-center bg-[#347338] p-4 rounded-md text-[#fff]">
            <span>
              <h3 className="font-semibold">Checking</h3>
              <p className="font-extralight">x1567</p>
            </span>
            <span>
              <h3 className="font-semibold">$1,380.12</h3>
              <p className="font-extralight">Available</p>
            </span>
          </div>
          <div className="flex items-center justify-center">
            <HiArrowLeft />
            <HiArrowRight />
          </div>
        </article>
        {/* action keys */}
        <article className="grid grid-cols-4 mt-10 gap-2">
          <ActionBtn icon={<FaExchangeAlt />} title="Transfer" />
          <ActionBtn icon={<FaMoneyBill />} title="Deposit" />
          <ActionBtn icon={<FaDollarSign />} title="Pay" />
          <ActionBtn icon={<HiMail />} title="Message" />
        </article>
        {/* transactions */}
        <article className="flex flex-col gap-6 mt-10">
          <div className="flex justify-between items-center">
            <h3>Transactions</h3>
            <span className="flex items-center gap-4">
              <HiSearch />
              <FaEllipsisH />
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <Transaction
              title="local cofee shop"
              date="Jan 25, Checking"
              amount="$3.65"
            />
            <Transaction
              title="Apple store"
              date="Jan 28, Checking"
              amount="$10.65"
            />
          </div>
        </article>
      </div>
      {/* desktop screen */}
      <div className="hidden lg:grid gap-6">
        {/* header */}
        {/* bg-[#347338] */}
        <article className=" text-[#fff] bg-[#347338] w-full px-0  py-4 flex flex-col gap-6 ">
          <span className="flex items-center gap-3">
            <img src={logo} alt="log-iumae" width={50} />
            <h3 className="text-3xl ">GreenOak Bank</h3>
          </span>
          <ul className="grid grid-cols-5 font-medium text-center ">
            {dLinks}
          </ul>
        </article>
        <article className="grid grid-cols-3">
          {/* sidebar */}
          <aside className="col-span-1 p-4 font-extralight">
            <div className="flex flex-col items-center gap-3 bg-[#f2f2f2]">
              <h3 className="font-semibold text-2xl">Hello User</h3>
              <span>
                <HiOutlineUserCircle className="text-6xl font-extralight" />
              </span>
              <p>Your last sign on: </p>
              <p>07/07/2023 3:24pm EDT</p>
            </div>
          </aside>
          <div className="col-span-2 text-left">
            <h3 className="text-2xl mb-5">Account Summary</h3>
            <p className="font-semibold">Deposit Accounts</p>
            <div className="grid grid-cols-4 bg-[#f2f2f2] px-4 py-2">
              <h3>Account</h3>
              <h3>Number</h3>
              <h3>Balance</h3>
              <h3>Effective Date</h3>
            </div>
            <div className="px-4 pt-4">
              <Account
                title="Checking"
                number="XXXXXX1234"
                balance="244.56"
                date="07/27/2023"
              />
              <Account
                title="Savings"
                number="XXXXXX5678"
                balance="400.56"
                date="07/27/2023"
              />
              <Account
                title="Mortgage & Loans"
                number="XXXXXX9012"
                balance="14,600.41"
                date="03/12/2023"
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
