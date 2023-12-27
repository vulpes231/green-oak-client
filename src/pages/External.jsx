import React, { useEffect, useState } from "react";
import { AnimatedInput, HomeButton } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addAccount, reset } from "../features/user/externalAcctSlice";

const initState = {
  account: "",
  routing: "",
  nick: "",
};

const External = () => {
  const [form, setForm] = useState(initState);
  const [showModal, SetShowModal] = useState(false);

  const dispatch = useDispatch();

  const { added, addError, addLoading } = useSelector(
    (state) => state.external
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(addAccount(form));
  };

  useEffect(() => {
    if (added) {
      SetShowModal(true);
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
          {/* error */}
          {addError && <p className="text-red-500">{addError}</p>}
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
