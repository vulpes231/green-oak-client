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
        // console.log(acct);
        return (
          <div
            key={acct._id}
            className="flex flex-col md:flex-row font-[Roboto] "
          >
            {/* mobile */}
            <div className="flex flex-col gap-4 w-full bg-white py-10 px-7 shadow-sm lg:hidden border-l-8 border-green-700 rounded-sm ">
              <span className="flex items-center uppercase font-semibold underline gap-1">
                <h3 className="">{acct.account_type}</h3>
                <p className="">{`${acct.account_num.slice(0, 4)}XXX`}</p>
              </span>
              <span className="flex items-center justify-between capitalize text-sm font-normal text-slate-500">
                <p className="">available balance</p>
                <h3>
                  <span
                    className={`${
                      acct.account_type.includes("cashback")
                        ? "text-red-500"
                        : "text-slate-500"
                    } text-2xl`}
                  >
                    <span
                      className={`${
                        acct.account_type.includes("cashback")
                          ? "flex"
                          : "hidden"
                      }`}
                    >
                      -
                    </span>{" "}
                    {` ${numeral(acct.available_bal).format("$0,0.00")}`}
                  </span>
                </h3>
              </span>
            </div>
            {/* desktop */}
            <div className="bg-white hidden lg:flex w-full border-l-4 border-green-700">
              <div className="border border-slate-300 flex flex-col gap-2 p-2 w-[50%] ">
                <span className="flex justify-between items-center">
                  <span className="flex items-center gap-2 font-light">
                    <h3 className="uppercase">{acct.account_type}</h3>
                    <h3>{`XXXX${acct.account_num.slice(5, -1)}`}</h3>
                  </span>
                  <HiDotsVertical />
                </span>
                <span className="flex justify-between items-center capitalize  text-sm font-medium">
                  <p>current balance</p>
                  <h3>{`${numeral(acct.available_bal).format("$0,0.00")}`}</h3>
                </span>
              </div>
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
    <section className=" text-[#333] h-[100vh] font-[Roboto] bg-slate-200 min-h-screen">
      {/* mobile screen */}
      <div className="lg:hidden relative p-6">
        {/* header */}

        {/* accoutns */}
        <article className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h3 className="font-medium text-lg md:text-xl">My Accounts</h3>
          </div>
          {userAccounts ? (
            <div className="flex flex-col gap-6">{accts}</div>
          ) : (
            <div>No accounts</div>
          )}
        </article>

        {/* transactions */}
        <h3 className="font-medium text-lg md:text-xl mt-5 my-3">
          Recent Activities
        </h3>

        <div className="flex flex-col gap-4">
          {userTrnxs && userTrnxs.length ? (
            <Transaction data={latestTransactions} />
          ) : (
            <div className="p-6 text-slate-400 text-sm font-light">
              You have no transactions.
            </div>
          )}
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
          <aside className="col-span-1">
            <div className="flex flex-col ">
              {contentLinks.map((cont) => {
                return (
                  <div
                    className="flex justify-between bg-green-700 text-white py-2.5 border-b border-slate-300 px-4 capitalize font-normal text-sm cursor-pointer items-center"
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
