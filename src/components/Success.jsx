import React, { useEffect } from "react";
import { MdCheckCircle } from "react-icons/md";

const Success = ({ text, onClose, duration = 5000 }) => {
	useEffect(() => {
		if (onClose) {
			const timer = setTimeout(() => {
				onClose();
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [onClose, duration]);

	return (
		<div className="fixed top-[90px] right-0 z-[1000] animate-fade-in">
			<div className="flex items-center bg-green-50 border border-green-100 rounded-lg shadow-lg p-4 max-w-xs md:max-w-sm">
				<MdCheckCircle className="flex-shrink-0 text-green-500 text-xl" />
				<div className="ml-3">
					<p className="text-sm font-medium text-green-800">{text}</p>
				</div>
				{onClose && (
					<button
						onClick={onClose}
						className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-100 inline-flex items-center justify-center h-8 w-8 transition-colors"
						aria-label="Close"
					>
						<span className="sr-only">Close</span>
						<svg
							className="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 14"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
							/>
						</svg>
					</button>
				)}
			</div>
		</div>
	);
};

export default Success;
