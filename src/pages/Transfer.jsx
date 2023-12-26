import React, { useState } from "react";
import { AnimatedInput, HomeButton } from "../components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { FaBookReader, FaPlusCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const initState = {
  from: "",
  to: "",
  amount: "",
  memo: "",
  date: new Date(),
};

const Transfer = () => {
  const [form, setForm] = useState(initState);

  const { accounts } = useSelector((state) => state.user);

  const fromAccounts = accounts.length
    ? accounts.map((acct) => {
        return (
          <option key={acct.account_num}>
            {acct.account_type.toUpperCase()}-{acct.account_num} - $
            {acct.available_bal}
          </option>
        );
      })
    : null;

  const handleDateChange = (date) => {
    setEditedData((prevData) => ({
      ...prevData,
      date,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="p-6 lg:p-0 flex flex-col gap-4">
      <HomeButton />
      <h3 className="text-2xl">External Transfer</h3>
      <div className="flex flex-col gap-10">
        <form className="font-extralight text-[#333] flex flex-col gap-4">
          <label htmlFor="">
            From
            <select
              name="from"
              className={`w-full border border-[#347338]  py-2 text-lg px-2 md:py-3 outline-none`}
              value={form.from}
              onChange={handleInputChange}
            >
              <option value="">Select Account </option>
              {fromAccounts}
            </select>
          </label>
          <label htmlFor="">
            To
            <select
              name="to"
              className={`w-full border border-[#347338]  py-2 text-lg px-2 md:py-3 outline-none`}
              value={form.to}
              onChange={handleInputChange}
            >
              <option value="">Select or Add External Account </option>
            </select>
          </label>
          <label htmlFor="">
            Amount
            <AnimatedInput
              placeholder="$ 0.00"
              value={form.amount}
              onChange={handleInputChange}
              name="amount"
            />
          </label>
          <label htmlFor="">
            Memo
            <AnimatedInput
              placeholder="Memo"
              value={form.memo}
              onChange={handleInputChange}
              name="memo"
            />
          </label>
          <label htmlFor="" className="flex flex-col">
            Date
            <DatePicker
              selected={form.date}
              onChange={handleDateChange}
              className="border border-[#347338] outline-none w-full md:w-[50%]  py-2 text-lg px-2 md:py-3"
              name="date"
            />
          </label>
          <button
            className={
              "bg-[#347338] text-[#fff] w-full py-3 font-semibold mt-5 rounded-lg "
            }
            disabled={form.from === form.to}
          >
            Send
          </button>
        </form>
        <article className="flex flex-col gap-4">
          <span className="flex items-center gap-1">
            <FaPlusCircle className="text-[#347338]" />
            <Link
              to="/external"
              className="underline text-[#347338] capitalize "
            >
              Add external account
            </Link>
          </span>
          <span className="flex items-center gap-1">
            <FaBookReader className="text-[#347338]" />
            <Link
              to="/external"
              className="underline text-[#347338] capitalize "
            >
              FAQ
            </Link>
          </span>
        </article>
      </div>
    </section>
  );
};

export default Transfer;
