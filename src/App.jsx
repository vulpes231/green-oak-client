import React, { useState, useEffect } from "react";
import { ActionBtn, Content } from "./components";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Dashboard,
  Deposit,
  Login,
  Payment,
  Profile,
  SignUp,
  Transfer,
  External,
  Otplogin,
} from "./pages";

import { getAccessToken } from "./constants";
import { FaDollarSign, FaExchangeAlt, FaMoneyBill } from "react-icons/fa";
import { HiUser } from "react-icons/hi";
import { MdHome } from "react-icons/md";

const authLinks = [
  {
    id: "dashboard",
    title: "dashboard",
    path: "dashboard",
    icon: <MdHome size={20} />,
  },
  {
    id: "transfer",
    title: "transfer",
    path: "transfer",
    icon: <FaExchangeAlt size={20} />,
  },
  {
    id: "deposit",
    title: "deposit",
    path: "deposit",
    icon: <FaMoneyBill size={20} />,
  },
  {
    id: "payment",
    title: "payment",
    path: "payment",
    icon: <FaDollarSign size={20} />,
  },
  {
    id: "profile",
    title: "profile",
    path: "profile",
    icon: <HiUser size={20} />,
  },
];

const App = () => {
  const token = getAccessToken();
  const [active, setActive] = useState("dashboard");
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1] || "dashboard";

    // console.log(currentPath);
    const matchingLink = authLinks.find((link) => link.id === currentPath);
    if (matchingLink) {
      setActive(matchingLink.id);
    }
  }, [location.pathname]);

  return (
    <div>
      {token && (
        <div className="w-full flex justify-evenly fixed bottom-0 bg-white p-3 left-0 shadow-md border-t border-slate-300 lg:hidden z-[50]">
          {authLinks.map((link) => {
            return (
              <ActionBtn
                key={link.id}
                icon={link.icon}
                title={link.title}
                path={link.path}
                active={active}
                handleClick={() => setActive(link.id)}
              />
            );
          })}
        </div>
      )}
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/external" element={<External />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/verifylogin" element={<Otplogin />} />
      </Routes>
    </div>
  );
};

export default App;
