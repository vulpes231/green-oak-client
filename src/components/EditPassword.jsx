import React, { useEffect, useState } from "react";
import { AnimatedInput, Error } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../features/user/changePassSlice";

const initState = {
  new_pass: "",
  password: "",
};

const EditPassword = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [form, setForm] = useState(initState);

  const { isLoading, isError, isChanged } = useSelector(
    (state) => state.changepassword
  );

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handlePassChange = (e) => {
    e.preventDefault();
    dispatch(changePassword(form));
  };

  useEffect(() => {
    if (isChanged) {
      setForm(initState);
    }
  }, [isChanged]);

  return (
    <form
      action=""
      className="bg-white p-6 rounded-md shadow-md flex flex-col gap-4 border border-slate-300"
    >
      <h3 className="text-xl font-medium">Update password</h3>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="w-full">
          <label htmlFor="">Current Password</label>
          <AnimatedInput
            type="password"
            value={form.password}
            onChange={handleInputChange}
            name="password"
          />
        </div>
        <div className="w-full">
          <label htmlFor="">New Password</label>
          <AnimatedInput
            type="password"
            value={form.new_pass}
            onChange={handleInputChange}
            name="new_pass"
          />
        </div>
      </div>
      <div className={!isError ? "hidden" : "flex text-red-500"}>
        {isError && <Error error={isError} />}
      </div>
      <div className={!isChanged ? "hidden" : "flex text-green-500"}>
        {isChanged && <p>Password changed succesfully.</p>}
      </div>
      <button
        onClick={handlePassChange}
        className="bg-green-700 mt-5 w-full py-2.5 rounded-3xl text-[#fff]"
      >
        Update Password
      </button>
    </form>
  );
};

export default EditPassword;
