import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatedInput, Check, Error, HomeButton } from "../components";
import { format, addDays } from "date-fns";
import { BsInfoCircle } from "react-icons/bs";
import { depositCheck } from "../features/user/depositSlice";
import CustomWebcam from "../components/Webcam";
import CameraModal from "./CameraModal";
import { MdMenu } from "react-icons/md";
import { getAccessToken } from "../constants";

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
  const [imgSrc, setImgSrc] = useState(null);
  const [openCam, setOpenCam] = useState(false);
  const { userAccounts } = useSelector((state) => state.account);
  const accessToken = getAccessToken();

  const { isSuccess, isLoading, isError } = useSelector(
    (state) => state.depositcheck
  );

  const videoRef = useRef();
  // get user accounts
  const accounts =
    userAccounts &&
    userAccounts.map((acct) => {
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
  // handle deposit submissions
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(depositCheck(form));
  }

  // open camera to capture
  const openCamera = async () => {
    setOpenCam(true);
    console.log("Opening camera...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Play the video to show the camera stream
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // use image
  const useImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenCam(false);
    setImgSrc(null);
  };
  // clear form data
  useEffect(() => {
    if (isSuccess) {
      setForm(initState);
    }
  });

  useEffect(() => {
    document.title = "RegentOak - Deposit";
  }, []);

  return (
    <section className=" text-[#333] bg-slate-50 min-h-screen flex flex-col md:items-center md:justify-center">
      <div className="flex p-4 bg-white md:hidden justify-between items-center ">
        <HomeButton />
        <MdMenu className="text-xl cursor-pointer" />
      </div>
      <h3 className="text-2xl text-center font-bold py-8 capitalize">
        Deposit a check
      </h3>
      <div className="p-6 flex flex-col gap-6 md:w-[350px] md:mx-auto md:bg-white md:shadow-md rounded-md ">
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col gap-4 font-extralight"
        >
          <div className="flex flex-col ">
            <label htmlFor="" className="text-sm">
              Deposit To:
            </label>
            <select
              name="deposit_to"
              className="border border-stone-400 font-bold outline-none w-full  py-2 text-sm px-2 capitalize bg-transparent"
              value={form.deposit_to}
              onChange={handleInputChange}
            >
              <option value="">Select Account</option>
              {accounts}
            </select>
          </div>
          <div>
            <label htmlFor="">Amount</label>
            <AnimatedInput
              type="text"
              value={form.amount}
              onChange={handleInputChange}
              placeholder="$ 0.00"
              name="amount"
            />
          </div>
          <small className="text-slate-500">
            Your current limit is $999,999,999.00
          </small>
          <div className="flex gap-4 ">
            <span className="w-full" onClick={openCamera}>
              <Check title="Front" />
            </span>
            <span className="w-full" onClick={openCamera}>
              <Check title="Back" />
            </span>

            {/* Display the camera stream */}
            <div className={!openCam ? "hidden" : "flex"}>
              <CameraModal>
                <CustomWebcam cancelCapture={useImage} />
              </CameraModal>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-green-300 bg-opacity-30 p-6 rounded-lg">
            <BsInfoCircle />
            <p className="font-light leading-4 text-sm">
              Your deposit will be available on {formattedDate}
            </p>
          </div>
          <div className={!isError ? "hidden" : "flex text-red-500"}>
            {isError && <Error error={isError} />}
          </div>
          <div className={!isSuccess ? "hidden" : "flex text-green-500"}>
            {isSuccess && <p>Deposit completed successfully </p>}
          </div>

          <button className="bg-[#347338] p-3 text-[#fff] font-semibold rounded-md mt-5">
            {isLoading ? "Submitting..." : " Submit Deposit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Deposit;
