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
			className="w-full px-4 py-3 border border-[#dedede] focus:ring-2 focus:ring-green-500 focus:border-transparent h-[48px] rounded-[5px] text-[16px] placeholder:text-[13px] outline-none"
			onFocus={animateInput}
			value={value}
			onChange={onChange}
			name={name}
			placeholder={placeholder}
		/>
	);
}

export default AnimatedInput;
