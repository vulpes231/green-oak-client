import React from "react";
import { Header, Footer, Content } from "./components";
import { Route, Routes } from "react-router-dom";

import { Login } from "./pages/index";
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
