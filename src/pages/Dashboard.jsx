import React, { useEffect, useState } from "react";
import { HiUser, HiDotsVertical } from "react-icons/hi";
import { FaDollarSign, FaExchangeAlt, FaMoneyBill } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { ActionBtn, Dash, HomeButton, Transaction } from "../components";
import { contentLinks, dashLinks, getAccessToken } from "../constants";
import { useNavigate } from "react-router-dom";
import { logo, user } from "../assets";
import Payment from "./Payment";
import Transfer from "./Transfer";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAccount,
  getUserTransactions,
} from "../features/user/accountSlice";
import { logoutUser } from "../features/auth/authSlice";
import numeral from "numeral";
import { MdMenu } from "react-icons/md";
import Authnav from "../components/Authnav";

const Dashboard = () => {
  const [activeLink, setActiveLink] = useState(dashLinks[0].id);
  const [displayComponent, setDisplayComponent] = useState("dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = getAccessToken();
  const username = sessionStorage.getItem("username");

  const { userAccounts, userTrnxs, getAccountError } = useSelector(
    (state) => state.account
  );

  // console.log(userTrnxs);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserAccount());
      dispatch(getUserTransactions());
    }
  }, [dispatch, accessToken]);

  const curDate = sessionStorage.getItem("loginDate");
  const curTime = sessionStorage.getItem("loginTime");

  const sortedTransactions = userTrnxs
    ? [...userTrnxs].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  const latestTransactions = sortedTransactions.slice(0, 6);

  const accts = userAccounts
    ? userAccounts.map((acct) => {
        const isNegative = acct.account_type.toLowerCase().includes("debit");
        const isDebitCard = acct.account_type.toLowerCase().includes("debit");

        return (
          <div key={acct._id} className="flex flex-col font-[Roboto] group ">
            <div className="flex flex-col gap-3 w-full lg:my-3 p-5 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md border border-gray-100 bg-white">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isDebitCard ? "bg-blue-500" : "bg-green-500"
                    }`}
                  ></div>
                  <h3 className="font-medium text-gray-700">
                    {acct.account_type
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </h3>
                </span>
                <span className="text-xs font-medium text-gray-400">
                  {`•••• ${acct.account_num.slice(-4)}`}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <p className="text-xs font-medium text-gray-500 tracking-wider">
                  AVAILABLE BALANCE
                </p>
                <h3
                  className={`text-xl font-semibold ${
                    isNegative ? "text-red-500" : "text-gray-800"
                  }`}
                >
                  {isNegative && <span className="text-red-500">-</span>}
                  {numeral(Math.abs(acct.available_bal)).format("$0,0.00")}
                </h3>
              </div>

              {isDebitCard && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Status</span>
                    <span className="bg-[#347338]/10 text-[#347338] p-1 rounded-[5px]">
                      active
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })
    : null;

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

  const logoutCurrentUser = () => {
    dispatch(logoutUser());
  };

  const dLinks = dashLinks.map((dsh) => {
    const isActive = activeLink === dsh.id;

    return (
      <span
        className={
          isActive
            ? "bg-slate-100 text-md capitalize rounded-sm py-3 px-6 font-medium text-green-500 cursor-pointer"
            : "text-md capitalize py-3 px-6 font-light cursor-pointer"
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
          } else if (dsh.id.includes("logout")) {
            logoutCurrentUser();
          }
        }}
      >
        <span>{dsh.title}</span>
      </span>
    );
  });

  useEffect(() => {
    document.title = "RegentOak - Dashboard";
  }, []);

  return (
    <section className="text-[#505050] font-[Roboto] bg-slate-200 min-h-screen">
      {/* mobile screen */}
      <div className="lg:hidden relative p-4 bg-gray-50 min-h-screen">
        {/* header */}
        <Authnav />

        {/* accounts */}
        <article className="flex flex-col gap-6 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-xl text-gray-800">My Accounts</h3>
          </div>

          {userAccounts ? (
            <div className="flex flex-col gap-4">{accts}</div>
          ) : (
            <div className="text-gray-500 text-center py-6">
              No accounts available
            </div>
          )}
        </article>

        {/* transactions */}
        <div className="mt-8">
          <h3 className="font-semibold text-xl text-gray-800 mb-4">
            Recent Activities
          </h3>

          <div className="flex flex-col gap-3 mb-24">
            {userTrnxs && userTrnxs.length ? (
              <Transaction data={latestTransactions} />
            ) : (
              <div className="p-6 text-center text-gray-400 text-sm">
                You have no recent transactions
              </div>
            )}
          </div>
        </div>
      </div>
      {/* desktop screen */}
      <div className="hidden lg:flex flex-col gap-6 min-h-screen bg-slate-200">
        {/* header */}
        <header className="w-full flex flex-col border-b border-slate-300 bg-white fixed top-0 left-0">
          <nav className="text-[#fff] bg-[#347338] py-4 px-8 flex justify-between items-center">
            <span className="flex items-center gap-1">
              <img src={logo} alt="log-iumae" width={50} />
              <h3 className="text-3xl font-bold">RegentOak</h3>
            </span>
            <span className="">
              <p className="font-medium capitalize">welcome, {username}</p>
              <p className="font-light text-xs">
                Last Login: {curDate} at {curTime}
              </p>
            </span>
          </nav>

          <div className="flex items-center gap-5 font-medium text-center ">
            {dLinks}
          </div>
        </header>
        <div className="grid grid-cols-3 gap-6 text-[#333] lg:max-w-[1200px] lg:mx-auto w-full p-6 h-full mt-36">
          <div className="col-span-2 h-full">
            {displayComponent === "dashboard" && <Dash accts={accts} />}
            {displayComponent === "payment" && <Payment />}
            {displayComponent === "transfer" && <Transfer />}
            {displayComponent === "profile" && <Profile />}
          </div>

          {/* sidebar */}
          <aside className="col-span-1 p-6">
            <div className="flex flex-col ">
              {contentLinks.map((cont) => {
                return (
                  <div
                    className="flex justify-between bg-green-700 rounded-[10px] text-white py-2.5 border-b border-slate-300 px-4 capitalize font-normal text-sm cursor-pointer items-center"
                    key={cont.id}
                  >
                    <span>{cont.name}</span>
                    <IoIosArrowForward />
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
