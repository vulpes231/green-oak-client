import React, { useState } from "react";
import { AnimatedInput, HomeButton } from "../components";

const initState = {
  account: "",
  routing: "",
  nick: "",
};

const External = () => {
  const [form, setForm] = useState(initState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <section className="p-6 lg:p-0 flex flex-col gap-4">
      <HomeButton />
      <div>
        <h3>Add External Account</h3>
        <form action="">
          <label htmlFor="">
            Account
            <AnimatedInput
              placeholder="Account Number"
              value={form.account}
              onChange={handleInputChange}
              name="account"
            />
          </label>
          <label htmlFor="">
            Routing
            <AnimatedInput
              placeholder="Routing Number"
              value={form.routing}
              onChange={handleInputChange}
              name="routing"
            />
          </label>
          <label htmlFor="">
            Account Nickname
            <AnimatedInput
              placeholder="Account Nickname"
              value={form.nick}
              onChange={handleInputChange}
              name="nick"
            />
          </label>
          <button className="bg-[#347338] text-[#fff] w-full py-3 font-semibold mt-5 rounded-lg">
            Add Account
          </button>
        </form>
      </div>
    </section>
  );
};

export default External;
