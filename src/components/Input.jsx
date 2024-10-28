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
      className="border-2 border-slate-300 focus:outline-[#347338] outline-none w-full p-1.5 focus:border-none rounded-sm bg-opacity-25 bg-slate-100"
      onFocus={animateInput}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
    />
  );
}

export default AnimatedInput;
