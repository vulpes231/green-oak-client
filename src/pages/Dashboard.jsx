import React, { useEffect, useState } from "react";
import { HiArrowLeft, HiArrowRight, HiSearch, HiUser } from "react-icons/hi";
import {
  FaDollarSign,
  FaEllipsisH,
  FaExchangeAlt,
  FaHome,
  FaMoneyBill,
} from "react-icons/fa";
import { ActionBtn, Dash, Transaction } from "../components";
import { dashLinks } from "../constants";
import { Link } from "react-router-dom";
import { logo, user } from "../assets";
import Payment from "./Payment";
import Transfer from "./Transfer";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../features/user/userSlice";

const Dashboard = () => {
  const [activeLink, setActiveLink] = useState(dashLinks[0].id);
  const [displayComponent, setDisplayComponent] = useState("dashboard");
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);
  console.log(userId);
  const accessToken = useSelector((state) => state.auth.accessToken);

  console.log(accessToken);

  const showDashboard = () => {
    setDisplayComponent("dashboard");
  };

  const showPayment = () => {
    setDisplayComponent("payment");
  };
  const showTransfer = () => {
    setDisplayComponent("transfer");
  };
  const showProfile = () => {
    setDisplayComponent("profile");
  };

  const dLinks = dashLinks.map((dsh) => {
    const isActive = activeLink === dsh.id;

    return (
      <li
        className={
          isActive
            ? "bg-[#fff] text-[#347338] text-lg uppercase rounded-sm py-3"
            : "text-lg uppercase border-r-4 border-r-[#347338] py-3"
        }
        key={dsh.id}
        onClick={() => {
          setActiveLink(dsh.id);

          if (dsh.id.includes("account")) {
            showDashboard();
          } else if (dsh.id.includes("payment")) {
            showPayment();
          } else if (dsh.id.includes("transfer")) {
            showTransfer();
          } else if (dsh.id.includes("profile")) {
            showProfile();
          }
        }}
      >
        <span>{dsh.title}</span>
      </li>
    );
  });

  useEffect(() => {
    dispatch(fetchUserData(userId, accessToken));
  }, [dispatch, userId, accessToken]);

  return (
    <section className="p-4 lg:p-0 text-[#333] min-h-screen   ">
      {/* mobile screen */}
      <div className="lg:hidden">
        {/* header */}
        <article className="flex flex-col gap-6 mb-10">
          <Link to="/dashboard">
            <FaHome className="text-xl cursor-pointer" />
          </Link>

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
          <ActionBtn
            icon={<FaExchangeAlt />}
            title="Transfer"
            path="/transfer"
          />
          <ActionBtn icon={<FaMoneyBill />} title="Deposit" path="/deposit" />
          <ActionBtn icon={<FaDollarSign />} title="Pay" path="/payment" />
          <ActionBtn icon={<HiUser />} title="Profile" path="/profile" />
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
        <article className=" text-[#fff] bg-[#347338] w-full px-0  flex flex-col gap-6 ">
          <span className="flex items-center gap-3">
            <img src={logo} alt="log-iumae" width={50} />
            <h3 className="text-3xl ">GreenOak Bank</h3>
          </span>
          <ul className="grid grid-cols-5 font-medium text-center ">
            {dLinks}
          </ul>
        </article>
        <article className="grid grid-cols-3 text-[#333] ">
          {/* sidebar */}
          <aside className="col-span-1 p-4 font-extralight">
            <div className="flex flex-col items-center gap-3 bg-[#f2f2f2] py-6 rounded-md">
              <h3 className="font-semibold text-2xl">Hello User</h3>
              <span>
                <img src={user} alt="user-profile-pic" width={50} />
              </span>
              <p>Your last sign on: </p>
              <p>07/07/2023 3:24pm EDT</p>
            </div>
          </aside>
          <div className="col-span-2 text-left py-4">
            {displayComponent === "dashboard" && <Dash />}
            {displayComponent === "payment" && <Payment />}
            {displayComponent === "transfer" && <Transfer />}
            {displayComponent === "profile" && <Profile />}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
