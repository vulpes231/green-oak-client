import React, { useEffect, useState } from "react";
import { AnimatedInput, Error } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../features/user/userSlice";

const initState = {
  new_pass: "",
  password: "",
};

const EditPassword = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [form, setForm] = useState(initState);

  const { changePassLoading, changePassError, passChanged } = useSelector(
    (state) => state.user
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
    if (passChanged) {
      setForm(initState);
    }
  }, [passChanged]);

  return (
    <form
      action=""
      className="bg-white p-6 rounded-md shadow-md flex flex-col gap-4 border border-slate-300"
    >
      <h3 className="text-xl font-medium">Update password</h3>
      <div className="flex flex-col gap-2">
        <div className="w-full">
          <AnimatedInput
            type="password"
            value={form.password}
            onChange={handleInputChange}
            name="password"
            placeholder={"Current Password"}
          />
        </div>
        <div className="w-full">
          <AnimatedInput
            type="password"
            value={form.new_pass}
            onChange={handleInputChange}
            name="new_pass"
            placeholder={"Confirm Password"}
          />
        </div>
      </div>
      <div className={!changePassError ? "hidden" : "flex text-red-500"}>
        {changePassError && <Error error={changePassError} />}
      </div>
      <div className={!passChanged ? "hidden" : "flex text-green-500"}>
        {passChanged && <p>Password changed succesfully.</p>}
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
