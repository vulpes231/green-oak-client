import React, { useEffect, useState } from "react";
import { HiUser, HiDotsVertical } from "react-icons/hi";
import { FaDollarSign, FaExchangeAlt, FaMoneyBill } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { ActionBtn, Dash, HomeButton, Transaction } from "../components";
import { contentLinks, dashLinks } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { logo, user } from "../assets";
import Payment from "./Payment";
import Transfer from "./Transfer";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserAccount,
  fetchUserTransactions,
} from "../features/user/userSlice";
import { format } from "date-fns";
import { logoutUser } from "../features/auth/authSlice";
import numeral from "numeral";
import { MdMenu } from "react-icons/md";

const Dashboard = () => {
  const [activeLink, setActiveLink] = useState(dashLinks[0].id);
  const [displayComponent, setDisplayComponent] = useState("dashboard");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, accessToken, userId } = useSelector((state) => state.auth);

  const { accounts, transactions } = useSelector((state) => state.user);
  // console.log("Accounts:", accounts);

  useEffect(() => {
    if (!accessToken || accessToken === null) {
      navigate("/login");
    }
  }, [accessToken]);

  // get user data
  useEffect(() => {
    if (userId && accessToken) {
      dispatch(fetchUserAccount(userId, accessToken));
    }
  }, []);

  // get user transaction
  useEffect(() => {
    if (userId && accessToken) {
      dispatch(fetchUserTransactions(accessToken));
    }
  }, [userId, accessToken, dispatch]);

  useEffect(() => {
    const curDate = format(new Date(), "dd:MM:yyyy");
    const curTime = format(new Date(), "HH:mm a");

    sessionStorage.setItem("loginDate", curDate);
    sessionStorage.setItem("loginTime", curTime);
  }, []);

  const curDate = sessionStorage.getItem("loginDate");
  const curTime = sessionStorage.getItem("loginTime");

  const sortedTransactions = transactions
    ? [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  const latestTransactions = sortedTransactions.slice(0, 6);

  const accts = accounts
    ? accounts.map((acct) => {
        // console.log(acct);
        return (
          <div
            key={acct._id}
            className="flex flex-col md:flex-row font-[Roboto]"
          >
            {/* mobile */}
            <div className="flex flex-col gap-4 w-full bg-white p-6 shadow-md lg:hidden rounded-sm border-l-4 border-green-700">
              <span className="flex items-center uppercase gap-1">
                <h3 className="">{acct.account_type}</h3>
                <p className="">{`XXXX${acct.account_num.slice(5, -1)}`}</p>
              </span>
              <span className="flex items-center justify-between font-medium capitalize text-sm">
                <p className="">current balance</p>
                <h3>{`$ ${numeral(acct.available_bal).format("$0,0.00")}`}</h3>
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
    document.title = "GreenOakTrust - Dashboard";
  }, []);

  return (
    <section className=" text-[#333] h-[100vh] font-[Roboto] bg-slate-50">
      <div className="flex p-4 bg-white lg:hidden justify-between items-center">
        <HomeButton />
        <MdMenu className="text-xl cursor-pointer" />
      </div>
      {/* mobile screen */}
      <div className="lg:hidden relative p-6">
        {/* header */}

        {/* accoutns */}
        <article className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h3 className="font-medium text-lg md:text-xl">My Accounts</h3>
          </div>
          {accounts ? <div>{accts}</div> : <div>No accounts</div>}
        </article>

        {/* transactions */}
        <h3 className="font-medium text-lg md:text-xl mt-5 my-3">
          Recent Activities
        </h3>
        <div className="flex flex-col gap-6 bg-white rounded-md shadow-md border">
          <div className="flex flex-col gap-4">
            {transactions.length ? (
              <Transaction data={latestTransactions} />
            ) : (
              <div className="p-6">You have no transactions.</div>
            )}
          </div>
        </div>
        {/* action keys */}
        <div className="w-full flex justify-evenly fixed bottom-0 bg-white p-3 left-0 shadow-md border-t border-slate-300">
          <ActionBtn
            icon={<FaExchangeAlt />}
            title="Transfer"
            path="/transfer"
          />
          <ActionBtn icon={<FaMoneyBill />} title="Deposit" path="/deposit" />
          <ActionBtn icon={<FaDollarSign />} title="Pay" path="/payment" />
          <ActionBtn icon={<HiUser />} title="Profile" path="/profile" />
        </div>
      </div>
      {/* desktop screen */}
      <div className="hidden lg:flex flex-col gap-6">
        {/* header */}
        <header className="w-full flex flex-col border-b border-slate-300 bg-white">
          <nav className="text-[#fff] bg-[#347338] py-4 px-8 flex justify-between items-center">
            <span className="flex items-center gap-1">
              <img src={logo} alt="log-iumae" width={50} />
              <h3 className="text-3xl font-bold">GreenOakTrust</h3>
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
        <div className="grid grid-cols-3 gap-6 text-[#333] lg:max-w-[1200px] lg:mx-auto w-full">
          <div className="col-span-2 text-left pb-10">
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
