"use client";

import Logo from "@/components/Logo";
import { generateMnemonics } from "@/utils/walletUtilities";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [password, setPassword] = useState("");
  const router= useRouter()

  const handleMnemonics = () => {
    if (password.length < 8) {
      return alert("Password must be at least 8 characters")
    }
    const res = generateMnemonics(password); 
    router.push(`/mnemonics?mnemonics=${res}&password=${password}`);
  };

  return (
    <div className="container">
      <div className="h-container">
        <Logo />
      </div>
      <div className="createAcc">
        <h2 className="my-4">Create a new account</h2>

        <div className="text-gray-400">
          {" "}
          <b>NOTE : </b> Password must be at least of 8 character
        </div>

        <div className="flex flex-col gap-2 items-center">
          <input
            type="text"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="py-2 bg-slate-100 rounded w-96 text-black outline-none"
          />
          <button
            className="py-[8px] cursor-pointer  px-6 bg-blue-500 rounded w-96 text-white hover:bg-white hover:text-black border"
            onClick={handleMnemonics}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
