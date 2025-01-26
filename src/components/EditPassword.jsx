import React, { useEffect, useState } from "react";
import { AnimatedInput, Error, Loader, Success } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, resetChangePass } from "../features/user/userSlice";

const initState = {
  new_pass: "",
  password: "",
};

const EditPassword = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [form, setForm] = useState(initState);
  const [error, setError] = useState("");

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
    if (changePassError) {
      setError(changePassError);
    }
  }, [changePassError]);

  useEffect(() => {
    let timeout;
    if (passChanged) {
      setTimeout(() => {
        dispatch(resetChangePass());
        setForm(initState);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [passChanged]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

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
            placeholder={"New Password"}
          />
        </div>
      </div>

      <button
        onClick={handlePassChange}
        className="bg-green-700 mt-5 w-full py-2.5 rounded-3xl text-[#fff]"
      >
        Update Password
      </button>

      {passChanged && <Success text="Password updated successfully" />}
      {error && <Error error={error} />}
      {changePassLoading && <Loader text="Updating password" />}
    </form>
  );
};

export default EditPassword;
