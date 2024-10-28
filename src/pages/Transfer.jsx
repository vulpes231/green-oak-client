import React, { useEffect, useState } from "react";
import { AnimatedInput, Error, HomeButton } from "../components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBookReader, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

// import { getExternalAccounts, reset } from "../features/user/externalAcctSlice";

import { sendMoney, reset } from "../features/user/TransferSlice";
import Modal from "../components/Modal";
import { generateRandomHash } from "../utils/gen";
import { MdMenu } from "react-icons/md";

const initState = {
  from: "",
  to: "",
  amount: "",
  memo: "",
  date: new Date(),
};

const Transfer = () => {
  const [form, setForm] = useState(initState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { accessToken, username } = useSelector((state) => state.auth);
  const { accounts } = useSelector((state) => state.user);
  // const { external } = useSelector((state) => state.external);

  const { trfLoad, trfError, success } = useSelector((state) => state.transfer);

  // console.log(trfError);

  const fromAccounts = accounts.length
    ? accounts.map((acct) => {
        return (
          <option key={acct._id} value={acct.account_num}>
            {acct.account_type.toUpperCase()}-{acct.account_num} - $
            {acct.available_bal}
          </option>
        );
      })
    : null;

  // const toAccounts =
  //   external.externalAccounts !== undefined
  //     ? external.externalAccounts.map((acct) => {
  //         return (
  //           <option key={acct._id} value={acct.account}>
  //             {acct.nick} - {acct.account}
  //           </option>
  //         );
  //       })
  //     : null;

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

  const resetInput = () => {
    setForm(initState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(sendMoney(form));
  };

  // useEffect(() => {
  //   if (accessToken && username) {
  //     dispatch(getExternalAccounts());
  //   }
  // }, []);

  useEffect(() => {
    if (success) {
      resetInput();
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  });

  return (
    <section className="flex flex-col gap-4 bg-white">
      <div className="flex p-4 bg-white lg:hidden justify-between items-center">
        <HomeButton />
        <MdMenu className="text-xl cursor-pointer" />
      </div>
      <div className="flex flex-col gap-10 p-6 lg:p-10 bg-slate-50">
        <h3 className="text-2xl">External Transfer</h3>
        <form className="font-extralight text-[#333] flex flex-col gap-4">
          <label htmlFor="">
            From
            <select
              name="from"
              className={`border-2 border-slate-500 focus:outline-[#347338] outline-none w-full p-1.5 focus:border-none rounded-sm bg-opacity-25 bg-slate-100`}
              value={form.from}
              onChange={handleInputChange}
            >
              <option value="">Select Account </option>
              {fromAccounts}
            </select>
          </label>
          <label htmlFor="">
            To
            {/* <select
              name="to"
              className={`w-full border border-[#347338]  py-2 text-lg px-2 md:py-3 outline-none`}
              value={form.to}
              onChange={handleInputChange}
            >
              <option value="">Select or Add External Account </option>
              {toAccounts}
            </select> */}
            <AnimatedInput
              placeholder="External Account Number"
              value={form.to}
              onChange={handleInputChange}
              name="to"
            />
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
              className="border-2 border-slate-500 focus:outline-[#347338] outline-none w-full lg:w-[50%] p-1.5 focus:border-none rounded-sm bg-opacity-25 bg-slate-100"
              name="date"
            />
          </label>
          {trfError && <span className="text-red-500">{trfError}</span>}

          {success && (
            <Modal
              icon={<FaCheckCircle />}
              text={`Transfer initiated successfully Reference No:${generateRandomHash()}.`}
            />
          )}

          <button
            className={
              "bg-[#347338] text-[#fff] w-full py-3 font-semibold mt-5 rounded-lg "
            }
            // disabled={form.from === form.to}
            onClick={handleSubmit}
          >
            {trfLoad ? "Initiating Transfer..." : "Send"}
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
