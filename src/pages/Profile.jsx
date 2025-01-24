import React, { useEffect, useState } from "react";
import { EditUserContact, EditPassword, HomeButton } from "../components";
import { prof } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import { MdMenu } from "react-icons/md";
import { getAccessToken } from "../constants";

const Profile = () => {
  const dispatch = useDispatch();
  const { getUserLoading, user, getUserError } = useSelector(
    (state) => state.user
  );
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
    }
  }, [accessToken]);

  useEffect(() => {
    document.title = "RegentOak - User Profile";
  }, []);

  return (
    <section className="flex flex-col gap-4 font-[Roboto] bg-slate-50">
      <div className="flex p-4 bg-white lg:hidden justify-between items-center">
        <HomeButton />
        <MdMenu className="text-xl cursor-pointer" />
      </div>
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center bg-white p-6 rounded-md shadow-md border border-slate-300">
          <img src={prof} alt="user-profile-image" className="w-[120px]" />
          <div className="font-extralight text-md text-[#333]">
            {getUserLoading ? (
              <p>Loading user details...</p>
            ) : user ? (
              <div className="flex flex-col gap-4">
                <h3 className="capitalize font-medium">
                  Name: <span className="font-light">{user.fullname}</span>
                </h3>
                <small className="capitalize font-medium">
                  Address: <span className="font-light">{user.address}</span>
                </small>
                <small className="font-medium">
                  Email: <span className="font-light">{user.email}</span>
                </small>
              </div>
            ) : (
              <p>No user data available.</p>
            )}
          </div>
        </div>

        <EditUserContact />
        <EditPassword />
      </div>
    </section>
  );
};

export default Profile;
