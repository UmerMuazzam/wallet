"use client";

import Logo from "@/components/Logo";
import { decryptMnemonics } from "@/utils/walletUtilities";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";


const page = () => {
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState(false); 
  const router = useRouter();  
  const mnemonics = localStorage.getItem("mnemmonics");
  
  const handleDashboard = async () => {
    try {
      const res = await decryptMnemonics(
        password,
        mnemonics,
        router,
        setCheckPass,
        "/dashboard"
      );
      
    } catch (error) {
      console.log(error,"something went wrong");
      setCheckPass(true);
    }
  };

  return (
    <div className="container">
      <div className="h-container">
        <Logo />
      </div>
      <div className="createAcc">
        <h3 className="my-4">
          <b>Wellcome Back:</b> Unlock your wallet account by providing password
        </h3>

        <div className="flex flex-col gap-2 items-center">
          <input
            type="text"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="py-2 bg-slate-100 rounded w-96 text-black outline-none"
          />
          <button
            className="py-[10px] cursor-pointer  px-6 bg-blue-500 rounded w-96 text-white hover:bg-white hover:text-black border"
            onClick={handleDashboard}
          >
            Unlock
          </button>
        </div>
      </div>

      {checkPass && (
        <div className="text-red-500 my-2">Please provide valid password </div>
      )}
    </div>
  );
};

export default page;
