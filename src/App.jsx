import React from "react";
import { Content } from "./components";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Payment, Profile, SignUp, Transfer } from "./pages";
import { useSelector } from "react-redux";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Content />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Login />}
      />
      <Route path="/payment" element={isLoggedIn ? <Payment /> : <Login />} />
      <Route path="/transfer" element={isLoggedIn ? <Transfer /> : <Login />} />
      <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
    </Routes>
  );
};

export default App;
