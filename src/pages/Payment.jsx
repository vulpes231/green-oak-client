import React from "react";
import { HomeButton } from "../components";
import WithAuth from "../hoc/WithAuth";

const Payment = () => {
  return (
    <section className="p-6 lg:p-0 flex flex-col gap-4">
      <HomeButton />
      <h3 className="text-2xl">Bill Payment</h3>
      <p className="text-red-500">
        User does not any have eligible account to use this feature.
      </p>
    </section>
  );
};

export default WithAuth(Payment);
