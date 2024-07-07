"use client";

import Logo from "@/components/Logo";
import { generateMnemonics } from "@/utils/generateMnemonics";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [password, setPassword] = useState("");
  const router= useRouter()

  const handleMnemonics = () => {
    if (password.length < 8) {
      return;
    }
    const res = generateMnemonics(password);
    router.push("/mnemonics")
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

        <input
          type="text"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="py-2 bg-slate-100 rounded w-96 text-black outline-none"
        />
        <span
          className="py-[10px] cursor-pointer  px-6 bg-slate-400 rounded w-96 text-white hover:bg-white hover:text-black border"
          onClick={handleMnemonics}
        >
          Login
        </span>
      </div>
    </div>
  );
};

export default page;
