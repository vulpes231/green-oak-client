import React from "react";
import { Content } from "./components";
import { Route, Routes } from "react-router-dom";

import { Dashboard, Login, SignUp } from "./pages/index";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
