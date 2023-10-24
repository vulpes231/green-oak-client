import React from "react";

const Button = ({ title, onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {title}
    </button>
  );
};

export default Button;
