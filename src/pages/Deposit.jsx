import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatedInput, Check, Error, HomeButton } from "../components";
import { format, addDays } from "date-fns";
import { BsInfoCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { depositCheck } from "../features/user/depositSlice";

const Deposit = () => {
  const dispatch = useDispatch();
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
  const { userId, accessToken } = useSelector((state) => state.auth);
  const { isSuccess, isLoading, isError } = useSelector(
    (state) => state.depositcheck
  );
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

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(depositCheck(form, userId, accessToken));
  }

  useEffect(() => {
    if (isSuccess) {
      // show modal
    }
  }, [isSuccess]);

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
      <HomeButton />
      <h3 className="text-2xl text-center mb-10 leading-5">Deposit a check</h3>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col gap-4 font-extralight"
      >
        <div className="flex flex-col ">
          <label htmlFor="">Deposit To:</label>
          <select
            name="deposit_to"
            className="border border-[#347338] outline-none w-full  py-3 text-lg px-2"
            value={form.deposit_to}
            onChange={handleInputChange}
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
            name="amount"
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
        <div className={!isError ? "hidden" : "flex text-red-500"}>
          {isError && <Error error={isError} />}
        </div>

        <button className="bg-[#347338] p-3 text-[#fff] font-semibold rounded-md mt-5">
          {isLoading ? "Submitting..." : " Submit Deposit"}
        </button>
      </form>
    </section>
  );
};

export default Deposit;
