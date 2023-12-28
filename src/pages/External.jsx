import React, { useEffect, useState } from "react";
import { AnimatedInput, HomeButton } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addAccount, reset } from "../features/user/externalAcctSlice";
import { FaCheckCircle } from "react-icons/fa";

const initState = {
  account: "",
  routing: "",
  nick: "",
  type: "",
};

const External = () => {
  const [form, setForm] = useState(initState);

  const dispatch = useDispatch();

  const { added, addError, addLoading } = useSelector(
    (state) => state.external
  );

  // console.log(addError);

  const resetInput = () => {
    setForm(initState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    dispatch(addAccount(form));
  };

  useEffect(() => {
    if (added) {
      console.log("Added");
      resetInput();
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [added, dispatch]);

  return (
    <section className="p-6 lg:p-0 flex flex-col gap-4">
      <HomeButton />
      <div>
        <h3 className="text-2xl mb-5">Add External Account</h3>
        <form action="" className="font-extralight">
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
          <label htmlFor="">
            Account Type
            <AnimatedInput
              placeholder="Checking or Savings"
              value={form.type}
              onChange={handleInputChange}
              name="type"
            />
          </label>
          {/* error */}
          {addError && <p className="text-red-500">{addError}</p>}

          {/* success */}
          {added && (
            <p className="text-green-500 pt-3">
              External Account added successfully.
            </p>
          )}
          <button
            className="bg-[#347338] text-[#fff] w-full py-3 font-semibold mt-5 rounded-lg"
            onClick={handleSubmit}
          >
            {addLoading ? "Adding External Account..." : " Add Account"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default External;
