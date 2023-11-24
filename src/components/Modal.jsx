import React from "react";

const Modal = ({ icon, text }) => {
  return (
    <div>
      <article>
        <span>{icon}</span>
        <h3>{text}</h3>
      </article>
    </div>
  );
};

export default Modal;
