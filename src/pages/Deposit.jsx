import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatedInput, Check, HomeButton } from "../components";
import { format, addDays } from "date-fns";
import { BsInfoCircle } from "react-icons/bs";

const Deposit = () => {
  const currentDate = new Date();
  let newDate;
  newDate = addDays(currentDate, 3);
  const formattedDate = format(newDate, "dd/MM/yyyy");

  const initState = {
    deposit_to: "",
    amount: "",
  };

  const [form, setForm] = useState(initState);
  const accts = useSelector((state) => state.user.accounts);
  const videoRef = useRef();

  const userAccounts = accts.map((acct) => {
    return (
      <option key={acct._id} value={acct.account_num}>
        {`${acct.account_type}: ${acct.account_num}`}
      </option>
    );
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  return (
    <section className="p-6 text-[#333]">
      <div className="flex gap-4 items-start">
        <HomeButton />
        <h3 className="text-2xl text-center mb-10 leading-5">
          Deposit a check
        </h3>
      </div>
      <form action="" className="flex flex-col gap-4 font-extralight">
        <div className="flex flex-col ">
          <label htmlFor="">Deposit To:</label>
          <select
            name="deposit_to"
            className="border border-[#347338] outline-none w-full  py-3 text-lg px-2"
          >
            <option value="">Select Account</option>
            {userAccounts}
          </select>
        </div>
        <div>
          <label htmlFor="">Amount</label>
          <AnimatedInput
            type="text"
            value={form.amount}
            onChange={handleInputChange}
            placeholder="$  0.00"
          />
        </div>
        <p>Your current limit is $2,000</p>
        <div className="flex gap-4 ">
          <span className="w-full" onClick={openCamera}>
            <Check title="Front" />
          </span>
          <span className="w-full" onClick={openCamera}>
            <Check title="Back" />
          </span>
        </div>
        <div className="flex items-start gap-2 bg-[#347338] bg-opacity-30 p-6 rounded-lg">
          <BsInfoCircle />
          <p className="font-extralight leading-4">
            Your deposit will be available on {formattedDate}
          </p>
        </div>
        <button className="bg-[#347338] p-3 text-[#fff] font-semibold rounded-md mt-5">
          Submit Deposit
        </button>
      </form>
    </section>
  );
};

export default Deposit;
