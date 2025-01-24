import React from "react";
import { HomeButton } from "../components";

const Payment = () => {
  return (
    <section className="p-6 flex flex-col gap-4 min-h-screen bg-slate-200">
      <HomeButton />
      <h3 className="text-2xl">Bill Payment</h3>
      <p className="text-red-500 text-xs bg-red-200 p-2 rounded-sm">
        User does not any have eligible account to use this feature.
      </p>
    </section>
  );
};

export default Payment;
