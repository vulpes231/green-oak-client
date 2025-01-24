import React, { useState } from "react";
import { ActionBtn, Content } from "./components";
import { Route, Routes } from "react-router-dom";
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

const App = () => {
  const token = getAccessToken();

  const [active, setActive] = useState("dashboard");

  return (
    <div>
      {token && (
        <div className="w-full flex justify-evenly fixed bottom-0 bg-white p-3 left-0 shadow-md border-t border-slate-300">
          <ActionBtn
            icon={<FaExchangeAlt size={20} />}
            title="Transfer"
            path="/transfer"
          />
          <ActionBtn
            icon={<FaMoneyBill size={20} />}
            title="Deposit"
            path="/deposit"
          />
          <ActionBtn
            icon={<FaDollarSign size={20} />}
            title="Pay"
            path="/payment"
          />
          <ActionBtn
            icon={<HiUser size={20} />}
            title="Profile"
            path="/profile"
          />
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
