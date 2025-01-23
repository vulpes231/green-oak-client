import React from "react";
import { Content } from "./components";
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

const App = () => {
  const token = getAccessToken();

  return (
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
  );
};

export default App;
