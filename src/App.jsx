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
} from "./pages";
import { useSelector } from "react-redux";
import External from "./pages/External";

const App = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Content />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={isLoggedIn && accessToken ? <Dashboard /> : <Login />}
      />
      <Route
        path="/payment"
        element={isLoggedIn && accessToken ? <Payment /> : <Login />}
      />
      <Route
        path="/transfer"
        element={isLoggedIn && accessToken ? <Transfer /> : <Login />}
      />
      <Route
        path="/external"
        element={isLoggedIn && accessToken ? <External /> : <Login />}
      />
      <Route
        path="/profile"
        element={isLoggedIn && accessToken ? <Profile /> : <Login />}
      />
      <Route
        path="/deposit"
        element={isLoggedIn && accessToken ? <Deposit /> : <Login />}
      />
    </Routes>
  );
};

export default App;
