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
      className="border border-[#347338] outline-none w-full  py-2 text-lg px-2 md:py-3"
      onFocus={animateInput}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
    />
  );
}

export default AnimatedInput;
