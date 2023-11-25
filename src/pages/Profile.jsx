import React, { useEffect, useState } from "react";
import { EditUserContact, EditPassword, HomeButton } from "../components";
import { prof } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/getUserSlice";

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

  return (
    <section className="p-6 lg:p-0 flex flex-col gap-4">
      <HomeButton />
      <div className="flex flex-col justify-center items-center gap-3">
        <img src={prof} alt="user-profile-image" className="w-[50px]" />
        <div className="font-extralight text-xs text-[#333]">
          {isLoading ? (
            <p>Loading user details...</p>
          ) : data ? (
            <div className="flex flex-col items-center">
              <h3 className="capitalize">Name: {displayName}</h3>
              <p>Address: {displayAddress}</p>
              <p>Email: {displayEmail}</p>
            </div>
          ) : (
            <p>No user data available.</p>
          )}
        </div>
      </div>

      <EditUserContact />
      <EditPassword />
    </section>
  );
};

export default Profile;
