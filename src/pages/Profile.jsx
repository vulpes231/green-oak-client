import React, { useEffect, useState } from "react";
import { EditUserContact, EditPassword, HomeButton } from "../components";
import { prof } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/getUserSlice";
import { MdMenu } from "react-icons/md";

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state) => state.getuser);
  const { accessToken, userId } = useSelector((state) => state.auth);

  // Local state to store the values to be displayed
  const [displayName, setDisplayName] = useState("");
  const [displayAddress, setDisplayAddress] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (data) {
      console.log("there is data to show");
      console.log(`data: ${data}`);
      console.log(data.fullname);

      // Set the values in local state
      setDisplayName(data.fullname);
      setDisplayAddress(data.address);
      setDisplayEmail(data.email);
    }
  }, [data]);

  useEffect(() => {
    document.title = "GreenOakTrust - User Profile";
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
            {isLoading ? (
              <p>Loading user details...</p>
            ) : data ? (
              <div className="flex flex-col gap-4">
                <h3 className="capitalize font-medium">
                  Name: <span className="font-light">{displayName}</span>
                </h3>
                <small className="capitalize font-medium">
                  Address: <span className="font-light">{displayAddress}</span>
                </small>
                <small className="font-medium">
                  Email: <span className="font-light">{displayEmail}</span>
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
