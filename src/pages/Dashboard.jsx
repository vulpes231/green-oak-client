import React, { useEffect, useState } from "react";
import { HiArrowLeft, HiArrowRight, HiSearch, HiUser } from "react-icons/hi";
import {
  FaDollarSign,
  FaEllipsisH,
  FaExchangeAlt,
  FaHome,
  FaMoneyBill,
} from "react-icons/fa";
import { ActionBtn, Dash, HomeButton, Transaction } from "../components";
import { dashLinks } from "../constants";
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

  const curDate = format(new Date(), "HH:mm:ss yyyy:MM:dd");

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
          <div key={acct._id}>
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

            <div className="hidden lg:grid grid-cols-3 bg-[#f2f2f2] px-4 py-2">
              <h3>{acct.account_type}</h3>
              <h3>{acct.account_num}</h3>
              <h3>{`$ ${acct.available_bal}`}</h3>
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
          } else if (dsh.id.includes("logout")) {
            logoutCurrentUser();
          }
        }}
      >
        <span>{dsh.title}</span>
      </li>
    );
  });

  return (
    <section className="p-4 lg:p-0 text-[#333] min-h-screen   ">
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
              <h3 className="font-semibold text-2xl capitalize">
                Hello {username}
              </h3>
              <span>
                <img src={user} alt="user-profile-pic" width={50} />
              </span>
              <p>Your last sign on: </p>
              <p>{curDate}</p>
            </div>
          </aside>
          <div className="col-span-2 text-left py-4">
            {displayComponent === "dashboard" && <Dash accts={accts} />}
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
