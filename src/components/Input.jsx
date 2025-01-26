import React, { useState } from "react";

function AnimatedInput({ type, value, onChange, name, placeholder }) {
  const [active, setActive] = useState(false);

  function animateInput() {
    setActive((prev) => !prev);
  }

  return (
    <input
      type={type}
      autoComplete="off"
      className="w-full focus:outline-[#347338] outline-none px-4 py-2.5 focus:border-none rounded-sm bg-slate-100 font-medium placeholder:text-sm"
      onFocus={animateInput}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
    />
  );
}

export default AnimatedInput;
