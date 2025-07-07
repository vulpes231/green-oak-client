import React, { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";

const Error = ({ error, onClose, duration = 7000 }) => {
	useEffect(() => {
		if (onClose) {
			const timer = setTimeout(() => {
				onClose();
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [onClose, duration]);

	return (
		<div className="absolute top-[90px] right-0 z-[1000] animate-fade-in">
			<div className="flex items-start bg-red-50 border border-red-100 rounded-lg shadow-lg p-4 max-w-xs md:max-w-sm">
				<MdErrorOutline className="flex-shrink-0 text-red-500 text-xl mt-0.5" />
				<div className="ml-3 flex-1">
					<p className="text-sm font-medium text-red-800">{error}</p>
				</div>
				{onClose && (
					<button
						onClick={onClose}
						className="ml-2 -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-100 inline-flex items-center justify-center h-8 w-8 transition-colors"
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

export default Error;
