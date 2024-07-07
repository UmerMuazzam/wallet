import React from "react";

const Button = ({ children }) => {
  return (
    <div className="bg-blue-500 rounded text-xl font-semibold border cursor-pointer w-[250px] text-white py-4 mx-auto hover:bg-white hover:text-blue-500">
      {children}
    </div>
  );
};

export default Button;
