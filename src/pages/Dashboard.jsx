import React, { useEffect, useState } from "react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiSearch,
  HiUser,
  HiDotsVertical,
} from "react-icons/hi";
import {
  FaDollarSign,
  FaEllipsisH,
  FaExchangeAlt,
  FaHome,
  FaMoneyBill,
} from "react-icons/fa";
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
import { MdArrowForward } from "react-icons/md";

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

  const latestTransactions = sortedTransactions.slice(0, 4);

  const trans =
    latestTransactions.length > 0 ? (
      latestTransactions.map((tx) => (
        <Transaction
          key={tx._id}
          title={tx.desc}
          date={tx.date}
          amount={`$ ${tx.amount}`}
        />
      ))
    ) : (
      <p>No transactions to show.</p>
    );

  const accts = accounts
    ? accounts.map((acct) => {
        // console.log(acct);
        return (
          <div key={acct._id} className="flex flex-col md:flex-row">
            <div className="flex justify-between items-center bg-[#347338] p-4 rounded-md text-[#fff] lg:hidden">
              <span className="">
                <h3 className="font-semibold">{acct.account_type}</h3>
                <p className="font-extralight">{acct.account_num}</p>
              </span>
              <span className="">
                <h3 className="font-semibold">{`$ ${acct.available_bal}`}</h3>
                <p className="font-extralight">Available</p>
              </span>
            </div>

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
                  <h3>{`$${acct.available_bal}`}</h3>
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
    <section className="p-4 lg:p-0 text-[#333] min-h-screen font-[Roboto] bg-slate-50">
      {/* mobile screen */}
      <div className="lg:hidden">
        {/* header */}
        <article className="flex flex-col gap-6 mb-10">
          <HomeButton />
          <div>
            <h3 className="text-2xl capitalize">Hi, {username}</h3>
            <p className="font-extralight">Last login {curDate}</p>
          </div>
        </article>
        {/* accoutns */}
        <article className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>Accounts</p>
            <FaEllipsisH />
          </div>
          {accounts ? <div>{accts}</div> : <div>No accounts</div>}
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
            {transactions.length ? (
              <div>{trans}</div>
            ) : (
              <div>You have no transactions.</div>
            )}
          </div>
        </article>
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
