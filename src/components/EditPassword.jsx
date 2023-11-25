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
    <form action="" className="lg:mr-10 mt-10 font-extralight">
      <h3 className="text-xl mb-3">Update contact info</h3>
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
        className="bg-[#347388] mt-5 w-full py-3 text-[#fff]"
      >
        Update Password
      </button>
    </form>
  );
};

export default EditPassword;
