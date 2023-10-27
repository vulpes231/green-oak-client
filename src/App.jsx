import React from "react";
import { Header, Footer, Content } from "./components";
import { Route, Routes } from "react-router-dom";

import { Login, SignUp } from "./pages/index";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
