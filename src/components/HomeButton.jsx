import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const HomeButton = () => {
	return (
		<div className="flex items-center justify-between lg:hidden">
			<Link to="/dashboard" className="text-xl">
				<FaHome className="text-xl cursor-pointer" />
			</Link>
		</div>
	);
};

export default HomeButton;
