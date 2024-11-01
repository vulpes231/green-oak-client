import React, { useState, useEffect } from "react";
import { AnimatedInput } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../features/user/editProfileSlice";

const initState = {
  email: "",
  phone: "",
};

const EditUserContact = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initState);

  const { isChanged, isError, isLoading } = useSelector(
    (state) => state.editprofile
  );

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(editProfile(form));
  };

  useEffect(() => {
    if (isChanged) {
      setForm(initState);
    }
  }, [isChanged]);

  return (
    <form
      action=""
      className="bg-white p-6 rounded-md shadow-md border border-slate-300 flex flex-col gap-4"
    >
      <h3 className="text-xl font-medium">Update contact</h3>
      <div className="flex flex-col lg:flex-row gap-2 text-sm font-medium">
        <div className="w-full">
          <label htmlFor="">Email Address</label>
          <AnimatedInput
            type="email"
            value={form.email}
            onChange={handleInputChange}
            name="email"
          />
        </div>
        <div className="w-full">
          <label htmlFor="">Phone</label>
          <AnimatedInput
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className={!isError ? "hidden" : "flex text-red-500"}>
        {isError && <Error error={isError} />}
      </div>
      <div className={!isChanged ? "hidden" : "flex text-green-500"}>
        {isChanged && <p>User profile updated succesfully.</p>}
      </div>
      <button
        onClick={handleProfileUpdate}
        className="bg-green-700 mt-5 w-full py-2.5 rounded-3xl text-[#fff] text-sm font-medium"
      >
        Update Contact
      </button>
    </form>
  );
};

export default EditUserContact;
