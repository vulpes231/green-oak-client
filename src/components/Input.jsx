import React, { useState } from "react";

function AnimatedInput({ type }) {
  const [active, setActive] = useState(false);

  function animateInput() {
    setActive((prev) => !prev);
  }

  return (
    <input
      type={type}
      autoComplete="off"
      className={
        !active
          ? "border outline-none w-full p-3 text-lg"
          : "border border-[#347338] outline-none w-full p-3 text-lg md:pylg"
      }
      onFocus={animateInput}
    />
  );
}

export default AnimatedInput;
