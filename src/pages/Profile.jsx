import React, { useEffect, useState } from "react";
import { EditUserContact, EditPassword, HomeButton } from "../components";
import { prof } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import { MdEmail, MdLocationOn, MdMenu, MdVerifiedUser } from "react-icons/md";
import { getAccessToken } from "../constants";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const { getUserLoading, user, getUserError } = useSelector(
    (state) => state.user
  );
  const accessToken = getAccessToken();

  // console.log(user);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken]);

  useEffect(() => {
    document.title = "RegentOak - User Profile";
  }, []);

  return (
    <section className=" font-[Roboto] p-6 md:p-0">
      <div className=" flex flex-col gap-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center bg-white p-6 rounded-md shadow-md border border-slate-300">
          <img src={prof} alt="user-profile-image" className="w-[120px]" />
          <div className="font-extralight text-md text-[#333]">
            {getUserLoading ? (
              <p>Loading user details...</p>
            ) : user ? (
              <div className="flex flex-col gap-4 capitalize font-medium">
                <span className="flex items-center gap-1">
                  <FaUser />
                  <small className="font-medium text-slate-500">
                    {user.fullname}
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <MdLocationOn />
                  <small className="font-medium text-slate-500">
                    {user.address}
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <MdEmail />
                  <small className="font-medium text-slate-500 lowercase">
                    {user.email}
                  </small>
                </span>
              </div>
            ) : (
              <p>No user data available.</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-20 md:mb-0">
          <EditUserContact />
          <EditPassword />
        </div>
      </div>
    </section>
  );
};

export default Profile;
