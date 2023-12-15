import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatedInput, Check, Error, HomeButton } from "../components";
import { format, addDays } from "date-fns";
import { BsInfoCircle } from "react-icons/bs";
import { depositCheck } from "../features/user/depositSlice";
import CustomWebcam from "../components/Webcam";
import CameraModal from "./CameraModal";

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
  const accts = useSelector((state) => state.user.accounts);
  const { userId, accessToken } = useSelector((state) => state.auth);
  const { isSuccess, isLoading, isError } = useSelector(
    (state) => state.depositcheck
  );
  const videoRef = useRef();
  // get user accounts
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
  // handle deposit submissions
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(depositCheck(form, userId, accessToken));
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
        <p>Your current limit is $999,999,999</p>
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
        <div className="flex items-start gap-2 bg-[#347338] bg-opacity-30 p-6 rounded-lg">
          <BsInfoCircle />
          <p className="font-extralight leading-4">
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
    </section>
  );
};

export default Deposit;
