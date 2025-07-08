import React, { useEffect } from "react";
import { EditUserContact, EditPassword, HomeButton } from "../components";
import { prof } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import { MdEmail, MdLocationOn, MdVerifiedUser } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { getAccessToken } from "../constants";
import Authnav from "../components/Authnav";
// import { Skeleton } from "../components";

const Profile = () => {
	const dispatch = useDispatch();
	const { getUserLoading, user, getUserError } = useSelector(
		(state) => state.user
	);
	const accessToken = getAccessToken();

	useEffect(() => {
		if (accessToken) dispatch(getUser());
	}, [accessToken]);

	useEffect(() => {
		document.title = "RegentOak | User Profile";
	}, []);

	return (
		<div className="max-w-6xl mx-auto p-4 md:p-6 mb-24">
			<Authnav />
			<div className="flex flex-col gap-6">
				{/* Profile Header Card */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
					<div className="p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
						<div className="relative">
							<img
								src={prof}
								alt="Profile"
								className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md"
							/>
							<button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-sm hover:bg-blue-700 transition-colors">
								<FiEdit2 size={16} />
							</button>
						</div>

						<div className="flex-1 space-y-4">
							{getUserLoading ? (
								<div>Getting User Information...</div>
							) : user ? (
								<>
									<h1 className="text-2xl md:text-3xl font-bold text-gray-800 capitalize">
										{user.fullname}
									</h1>

									<div className="space-y-1">
										<div className="flex items-center gap-3">
											<MdEmail className="text-gray-500 text-xl" />
											<span className="text-gray-600">{user.email}</span>
										</div>
										<div className="flex items-center gap-3">
											<MdLocationOn className="text-gray-500 text-xl" />
											<span className="text-gray-600 capitalize">
												{user.address || "No address provided"}
											</span>
										</div>
									</div>
								</>
							) : (
								<div className="text-red-500">
									{getUserError || "No user data available"}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Edit Sections */}
				<div className="grid md:grid-cols-2 gap-6">
					<EditUserContact />
					<EditPassword />
				</div>
			</div>
		</div>
	);
};

export default Profile;
