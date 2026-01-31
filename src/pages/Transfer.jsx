import React, { useEffect, useState } from "react";
import { AnimatedInput, Error, HomeButton } from "../components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBookReader,
  FaCheckCircle,
  FaPlusCircle,
  FaChevronDown,
  FaCoins,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { sendMoney, resetTransfer } from "../features/user/TransferSlice";
import Modal from "../components/Modal";
import { generateRandomHash } from "../utils/gen";
import Authnav from "../components/Authnav";
import Crypto from "./Crypto";
import { MdMoney } from "react-icons/md";

const styles = {
  link: "inline-flex items-center text-green-600 hover:text-green-800 text-[12px] font-normal transition-colors cursor-pointer",
  label:
    "block text-[14px] font-semibold text-[#979797] text-[14px] font-normal",
};

const Transfer = ({ activeLink }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    from: "",
    to: "",
    amount: "",
    memo: "",
    date: new Date(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showCrypto, setShowCrypto] = useState(false);

  const { userAccounts } = useSelector((state) => state.account);
  const { trfLoad, trfError, trfSuccess } = useSelector(
    (state) => state.transfer
  );

  const fromAccounts =
    userAccounts &&
    userAccounts.map((acct) => (
      <option key={acct._id} value={acct.account_num}>
        {acct.account_type.charAt(0).toUpperCase() + acct.account_type.slice(1)}{" "}
        ••••{acct.account_num.slice(-4)} (${acct.available_bal.toFixed(2)})
      </option>
    ));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in form) {
      if (key !== "memo" && form[key] === "") {
        setError("All fields required!");
        return;
      }
    }
    setIsSubmitting(true);
    dispatch(sendMoney(form));
  };

  useEffect(() => {
    if (trfError) {
      console.log(trfError);
      setError(trfError);
    }
  }, [trfError]);

  useEffect(() => {
    let timer;
    if (trfError) {
      setIsSubmitting(false);
      timer = setTimeout(() => {
        dispatch(resetTransfer());
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [trfError, dispatch]);

  // useEffect(() => {
  // 	let timer;
  // 	if (trfSuccess) {
  // 		setIsSubmitting(false);
  // 		timer = setTimeout(() => {
  // 			dispatch(resetTransfer());
  // 			setForm({ from: "", to: "", amount: "", memo: "", date: new Date() });
  // 			window.location.reload();
  // 		}, 3000);
  // 	}
  // 	return () => clearTimeout(timer);
  // }, [trfSuccess, dispatch]);

  useEffect(() => {
    document.title = "RegentOak | Transfer Money";
  }, []);

  return (
    <section className="p-6 mb-24 flex flex-col gap-4">
      <Authnav />
      <div>
        {!showCrypto ? (
          <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 overflow-hidden w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Move Money
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-5 text-[#505050]"
              >
                <div className="space-y-4">
                  {/* From Account */}
                  <div className="relative">
                    <label className={styles.label}>From Account</label>
                    <div className="relative">
                      <select
                        name="from"
                        value={form.from}
                        onChange={handleInputChange}
                        className="block w-full pl-4 pr-10 py-3 text-base bg-white border border-[#dedede] focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none  bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjd2ViYzAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem] h-[48px] text-[12px] rounded-[5px]"
                        required
                      >
                        <option value="">Select your account</option>
                        {fromAccounts}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <FaChevronDown className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* To Account */}
                  <div>
                    <label className={styles.label}>To Account</label>
                    <AnimatedInput
                      placeholder="Enter external account number"
                      value={form.to}
                      onChange={handleInputChange}
                      name="to"
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Amount and Memo */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={styles.label}>Amount</label>
                      <div className="relative">
                        <AnimatedInput
                          type="number"
                          placeholder="$0.00"
                          value={form.amount}
                          onChange={handleInputChange}
                          name="amount"
                          required
                          min="0.01"
                          step="0.01"
                          className="w-full pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={styles.label}>Memo</label>
                      <AnimatedInput
                        placeholder="Optional note"
                        value={form.memo}
                        onChange={handleInputChange}
                        name="memo"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || trfLoad}
                  className="w-full lg:w-[180px] py-3 px-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium rounded-lg shadow-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting || trfLoad ? (
                    <span className="inline-flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Submit Transfer"
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <Crypto fromAccounts={fromAccounts} />
        )}
      </div>
      {/* Footer Links */}
      <div className="rounded-[10px] px-6 py-4 bg-white ">
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => setShowCrypto((prev) => !prev)}
            className={styles.link}
          >
            <FaCoins className="mr-2" />
            {showCrypto ? (
              <h5>Move Money </h5>
            ) : (
              <h5>Withdraw via USDT (New)*</h5>
            )}
          </button>
          <Link to="/external" className={styles.link}>
            <FaPlusCircle className="mr-2" />
            Add external account
          </Link>
          <Link to="/faq" className={styles.link}>
            <FaBookReader className="mr-2" />
            View external accounts
          </Link>
        </div>
      </div>
      {/* Success Modal */}
      {!showCrypto && trfSuccess && (
        <Modal
          icon={<FaCheckCircle className="text-green-500 text-4xl" />}
          text={`Transfer initiated successfully. Reference No: ${generateRandomHash()}`}
          onClose={() => {
            dispatch(resetTransfer());
            window.location.reload();
          }}
        />
      )}
      {/* Error Message */}
      {error && (
        <Error error={error} onClose={() => setError("")} duration={3000} />
      )}
    </section>
  );
};

export default Transfer;
