import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, Success } from "../components"; // Ensure Success is imported
import { getLoginCode, resetLoginOtp } from "../features/auth/otpSlice"; // Ensure resetLoginOtp is imported
import { useNavigate } from "react-router-dom"; // Ensure useNavigate is imported

const Otplogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate hook
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ otp: "" });
  const [otpVerified, setOtpVerified] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const email = sessionStorage.getItem("email");

  const data = { email: email };

  const { otpLoading, otpError, loginOtp } = useSelector((state) => state.otp);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setIsDisabled(e.target.value.length !== 6);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    console.log(loginOtp);

    if (!form.otp) {
      setError("OTP required!");
      return;
    }

    if (loginOtp === form.otp) {
      setOtpVerified(true);
      dispatch(resetLoginOtp());
      window.location.href = "/dashboard";
    } else {
      setError("Incorrect OTP Code!");
    }
  };

  useEffect(() => {
    if (otpError) {
      setError(otpError);
    }
  }, [otpError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    if (email && !otpSent) {
      dispatch(getLoginCode(data));
      setOtpSent(true); // Mark OTP as sent to prevent resending
      console.log("otp sent");
    }
  }, [email, otpSent]);

  useEffect(() => {
    document.title = "RegentOak - Verify Login";
  }, []);

  useEffect(() => {
    let timeout;
    if (otpVerified) {
      timeout = setTimeout(() => {
        dispatch(resetLoginOtp()); // Reset OTP state after verification
        navigate("/dashboard");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [otpVerified, dispatch, navigate]);

  return (
    <div className="w-full h-screen flex items-center justify-center p-6 md:p-0">
      <div className="bg-white shadow flex flex-col gap-6 w-full md:w-[380px] p-6 rounded-sm">
        <h1 className="font-bold">Enter OTP</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label htmlFor="otp" className="text-slate-500 text-sm font-light">
              We sent a verification code to your registered email address.{" "}
              {email && email}
            </label>
            <input
              type="text"
              className="border-2 border-slate-700 outline-none p-2"
              name="otp"
              value={form.otp}
              onChange={handleInput}
              pattern="[0-9]{6}"
              maxLength={6}
              required
              placeholder="123456"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={isDisabled}
            className={`${
              isDisabled ? "bg-gray-500" : "bg-green-600"
            } text-slate-100 p-2 mt-4`}
          >
            Verify OTP
          </button>

          <small className="text-center">
            Didn&apos;t receive the code?{" "}
            <button
              onClick={() => {
                // Check if OTP has already been sent before allowing resend
                if (!otpSent) {
                  dispatch(getLoginCode(data));
                  setOtpSent(true);
                }
              }}
              className="text-green-600 underline"
            >
              Resend
            </button>
          </small>
        </form>
      </div>
      {otpLoading && <Loader text={"sending OTP..."} />}
      {error && <Error error={error} />}
      {otpVerified && <Success text={"OTP verified."} />}
    </div>
  );
};

export default Otplogin;
