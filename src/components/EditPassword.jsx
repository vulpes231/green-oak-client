import React, { useState, useEffect } from "react";
import { AnimatedInput, Error, Success, Loader } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, resetChangePass } from "../features/user/userSlice";
import { FiLock, FiKey } from "react-icons/fi";

const EditPassword = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ new_pass: "", password: "" });
  const [error, setError] = useState("");
  const { changePassLoading, changePassError, passChanged } = useSelector(
    (state) => state.user
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePassChange = (e) => {
    e.preventDefault();
    if (form.new_pass.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    dispatch(changePassword(form));
  };

  useEffect(() => {
    if (changePassError) setError(changePassError);
  }, [changePassError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (passChanged) {
        dispatch(resetChangePass());
        setForm({ new_pass: "", password: "" });
      }
      if (error) setError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [passChanged, error]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Change Password</h2>

        <form onSubmit={handlePassChange} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <AnimatedInput
                type="password"
                value={form.password}
                onChange={handleInputChange}
                name="password"
                placeholder="Enter current password"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <AnimatedInput
                type="password"
                value={form.new_pass}
                onChange={handleInputChange}
                name="new_pass"
                placeholder="At least 8 characters"
                className="pl-10"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Use a strong, unique password
            </p>
          </div>

          {error && <Error error={error} />}
          {passChanged && <Success text="Password updated successfully" />}
          {changePassLoading && <Loader text="Updating password..." />}

          <button
            type="submit"
            disabled={changePassLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium rounded-lg shadow-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPassword;
