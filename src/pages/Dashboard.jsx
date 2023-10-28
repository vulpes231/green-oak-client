import React from "react";
import { HiArrowLeft, HiArrowRight, HiMail, HiMenu } from "react-icons/hi";
import {
  FaDollarSign,
  FaEllipsisH,
  FaExchangeAlt,
  FaMoneyBill,
} from "react-icons/fa";
import { ActionBtn } from "../components";

const Dashboard = () => {
  return (
    <section className="p-4 text-[#333]  ">
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
    </section>
  );
};

export default Dashboard;
