import React, { useState } from "react";
import { AnimatedInput } from "../components";

const EditUserContact = () => {
  const initState = {
    email: "",
    phone: "",
  };
  const [form, setForm] = useState(initState);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <form action="" className="lg:mr-10 mt-10 font-extralight">
      <h3 className="text-xl mb-3">Update contact info</h3>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="w-full">
          <label htmlFor="">Email Address</label>
          <AnimatedInput
            type="email"
            value={form.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full">
          <label htmlFor="">Phone</label>
          <AnimatedInput type="text" />
        </div>
      </div>
      <button className="bg-[#347388] mt-5 w-full py-3 text-[#fff]">
        Update Contact
      </button>
    </form>
  );
};

export default EditUserContact;
