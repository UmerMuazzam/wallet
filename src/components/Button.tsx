import React from "react";

const Button = ({ children }) => {
  return (
    <button
      type="button"
      className=" bg-blue text-[18px] font-normal text-white w-[240px]  h-[50px] rounded-lg shadow-lg  hover:animate-pulse"
    >
      {children}
    </button>
  );
};

export default Button;
