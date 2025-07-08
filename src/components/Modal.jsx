import React from "react";

const Modal = ({ icon, text, onClose }) => {
	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 mx-4"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-col items-center space-y-4">
					{icon && <div className="text-4xl text-green-600 mb-2">{icon}</div>}
					<h3 className="text-lg font-medium text-gray-900 text-center">
						{text}
					</h3>
					<button
						onClick={onClose}
						className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
