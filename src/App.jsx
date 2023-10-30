import React from "react";
import { Content } from "./components";
import { Route, Routes } from "react-router-dom";

import { Dashboard, Login, Payment, Profile, SignUp, Transfer } from "./pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
