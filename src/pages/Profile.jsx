import React, { useState } from "react";
import { EditUserContact, EditPassword, HomeButton } from "../components";

const Profile = () => {
  return (
    <section className="p-6 lg:p-0 flex flex-col gap-4">
      <HomeButton />
      <h3 className="text-2xl">Edit User Profile</h3>
      <EditUserContact />
      <EditPassword />
    </section>
  );
};

export default Profile;
