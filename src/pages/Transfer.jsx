import React, { useEffect, useState } from "react";
import { AnimatedInput, Error, HomeButton } from "../components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBookReader, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { sendMoney, reset } from "../features/user/TransferSlice";
import Modal from "../components/Modal";
import { generateRandomHash } from "../utils/gen";

const styles = {
  label: "text-sm font-semibold",
};

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

  const { userAccounts } = useSelector((state) => state.account);

  const { trfLoad, trfError, success } = useSelector((state) => state.transfer);

  const fromAccounts =
    userAccounts && userAccounts.length
      ? userAccounts.map((acct) => {
          return (
            <option key={acct._id} value={acct.account_num}>
              {acct.account_type.toUpperCase()}: $
              {acct.available_bal.toFixed(2)}{" "}
            </option>
          );
        })
      : null;

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

  useEffect(() => {
    if (success) {
      resetInput();
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  });

  useEffect(() => {
    document.title = "RegentOak - Transfer";
  }, []);

  return (
    <section className="flex flex-col gap-4 ">
      <form className="font-light text-[#333] flex flex-col gap-4 bg-white p-6 shadow">
        <h3 className="text-2xl font-medium my-4">Move Money</h3>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <select
            name="from"
            className={` focus:outline-[#347338] outline-none w-full py-2.5 px-4 focus:border-none rounded-sm bg-slate-100 text-sm`}
            value={form.from}
            onChange={handleInputChange}
          >
            <option value="">Select Account </option>
            {fromAccounts}
          </select>
          <AnimatedInput
            placeholder="External Account Number"
            value={form.to}
            onChange={handleInputChange}
            name="to"
          />
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <AnimatedInput
            placeholder="$ 0.00"
            value={form.amount}
            onChange={handleInputChange}
            name="amount"
          />
          <AnimatedInput
            placeholder="Memo"
            value={form.memo}
            onChange={handleInputChange}
            name="memo"
          />
        </div>
        {/* <div className="flex flex-col md:flex-row w-full md:w-[50%] gap-4">
          <AnimatedInput
            selected={form.date}
            onChange={handleInputChange}
            type={"date"}
            name="date"
          />
        </div> */}
        {trfError && <span className="text-red-500">{trfError}</span>}

        {success && (
          <Modal
            icon={<FaCheckCircle />}
            text={`Transfer initiated successfully Reference No:${generateRandomHash()}.`}
          />
        )}

        <div>
          <button
            className={
              "bg-[#347338] text-[#fff] py-2 px-10 font-normal mt-5 text-md rounded-3xl"
            }
            // disabled={form.from === form.to}
            onClick={handleSubmit}
          >
            {trfLoad ? "Initiating Transfer..." : "Submit"}
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-4 text-xs p-6">
        <span className="flex items-center gap-1">
          <FaPlusCircle className="text-[#347338]" />
          <Link to="/external" className="underline text-[#347338] capitalize ">
            Add external account
          </Link>
        </span>
        <span className="flex items-center gap-1">
          <FaBookReader className="text-[#347338]" />
          <Link to="/external" className="underline text-[#347338] capitalize ">
            FAQ
          </Link>
        </span>
      </div>
    </section>
  );
};

export default Transfer;
