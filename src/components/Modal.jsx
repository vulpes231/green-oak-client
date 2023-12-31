import React from "react";

const Modal = ({ icon, text }) => {
  return (
    <div className="w-full h-screen bg-black bg-opacity-20 fixed top-0 left-0 flex items-center justify-center p-6">
      <article className="bg-white flex flex-col justify-center items-center p-6 rounded-lg shadow-lg">
        <span className="text-3xl text-green-700">{icon}</span>
        <h3 className="text-center">{text}</h3>
      </article>
    </div>
  );
};

export default Modal;
