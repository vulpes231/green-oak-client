import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatedInput, Check, Error, HomeButton } from "../components";
import { format, addDays } from "date-fns";
import { BsInfoCircle, BsCamera } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { depositCheck } from "../features/user/depositSlice";
import CustomWebcam from "../components/Webcam";
import CameraModal from "./CameraModal";
import { MdMenu } from "react-icons/md";
import { getAccessToken } from "../constants";
import Authnav from "../components/Authnav";

const Deposit = () => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const formattedDate = format(addDays(currentDate, 3), "MMMM d, yyyy");

  const [form, setForm] = useState({
    deposit_to: "",
    amount: "",
  });

  const [imgSrc, setImgSrc] = useState(null);
  const [openCam, setOpenCam] = useState(false);
  const [cameraMode, setCameraMode] = useState("front"); // 'front' or 'back'
  const { userAccounts } = useSelector((state) => state.account);
  const { isSuccess, isLoading, isError } = useSelector(
    (state) => state.depositcheck
  );
  const videoRef = useRef();

  const accounts =
    userAccounts &&
    userAccounts.map((acct) => (
      <option key={acct._id} value={acct.account_num}>
        {acct.account_type.charAt(0).toUpperCase() + acct.account_type.slice(1)}{" "}
        ••••{acct.account_num.slice(-4)}
      </option>
    ));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.deposit_to || !form.amount) return;
    dispatch(depositCheck(form));
  };

  const openCamera = (mode) => {
    setCameraMode(mode);
    setOpenCam(true);
  };

  const useImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("clicked");
    setOpenCam(false);
    setImgSrc(null);
  };

  useEffect(() => {
    if (isSuccess) {
      setForm({ deposit_to: "", amount: "" });
    }
  }, [isSuccess]);

  useEffect(() => {
    document.title = "RegentOak - Deposit";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col mb-24">
      <Authnav />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {/* Form Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">
              Deposit a Check
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Funds typically available by {formattedDate}
            </p>
          </div>

          {/* Deposit Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Account Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Deposit To
              </label>
              <div className="relative">
                <select
                  name="deposit_to"
                  value={form.deposit_to}
                  onChange={handleInputChange}
                  className="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-lg appearance-none bg-white"
                  required
                >
                  <option value="">Select an account</option>
                  {accounts}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FiChevronDown className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
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
                  className="w-full pl-8"
                />
              </div>
              <p className="text-xs text-gray-500">
                Daily deposit limit: $25,000.00
              </p>
            </div>

            {/* Check Images */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Check Images
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => openCamera("front")}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-500 transition-colors"
                >
                  <BsCamera className="text-gray-400 text-2xl mb-2" />
                  <span className="text-sm font-medium">Front</span>
                  {imgSrc && cameraMode === "front" && (
                    <span className="text-xs text-green-500 mt-1">
                      Captured
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => openCamera("back")}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-500 transition-colors"
                >
                  <BsCamera className="text-gray-400 text-2xl mb-2" />
                  <span className="text-sm font-medium">Back</span>
                  {imgSrc && cameraMode === "back" && (
                    <span className="text-xs text-green-500 mt-1">
                      Captured
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-green-50 p-4 rounded-lg flex items-start gap-3">
              <BsInfoCircle className="text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-green-700">
                Your deposit will be available on{" "}
                <span className="font-medium">{formattedDate}</span>. We may
                place a hold on your funds if needed.
              </p>
            </div>

            {/* Error/Success Messages */}
            {isError && (
              <div className="bg-red-50 p-3 rounded-lg text-red-600 text-sm">
                <Error error={isError} />
              </div>
            )}
            {isSuccess && (
              <div className="bg-green-50 p-3 rounded-lg text-green-600 text-sm">
                Deposit submitted successfully. Reference #:{" "}
                {Math.random().toString(36).substring(2, 10).toUpperCase()}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium rounded-lg shadow-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="inline-flex items-center justify-center">
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
                "Submit Deposit"
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Camera Modal */}
      {openCam && (
        <CameraModal isOpen={openCam} onClose={() => setOpenCam(false)}>
          <CustomWebcam
            mode={cameraMode}
            cancelCapture={useImage}
            onCapture={(image) => {
              setImgSrc(image);
              setOpenCam(false);
            }}
          />
        </CameraModal>
      )}
    </div>
  );
};

export default Deposit;
