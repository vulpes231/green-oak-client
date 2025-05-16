import React, { useState, useEffect } from "react";
import { AnimatedInput, Error, Success } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/user/userSlice";
import { FiMail, FiPhone } from "react-icons/fi";

const EditUserContact = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", phone: "" });
  const { updateUserLoading, updateUserError, userUpdated } = useSelector(
    (state) => state.user
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          Update Contact Information
        </h2>

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <AnimatedInput
                type="email"
                value={form.email}
                onChange={handleInputChange}
                name="email"
                placeholder="your@email.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <AnimatedInput
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="+1 (___) ___-____"
                className="pl-10"
              />
            </div>
          </div>

          {updateUserError && <Error error={updateUserError} />}
          {userUpdated && (
            <Success text="Contact information updated successfully" />
          )}

          <button
            type="submit"
            disabled={updateUserLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium rounded-lg shadow-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {updateUserLoading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserContact;
