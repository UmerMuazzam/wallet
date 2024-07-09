"use client";

import Error from "@/components/Error";
import Logo from "@/components/Logo";
import { generateMnemonics } from "@/utils/walletUtilities";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [matched,setMatched]=useState(true)
  const router= useRouter()
 
  const onChangeHandler= (e)=>{
    setMatched(true)
    if (e.target.name == "password")
    {
      setPassword(e.target.value)
    }
    else{
      setConfirmPass(e.target.value)
    }
  }




  const handleMnemonics = () => {
    if (password != confirmPass)  return setMatched(false)
      setMatched(true)
      if (password.length < 8) {
        return alert("Password must be at least 8 characters");
      }
    const res = generateMnemonics(password); 
    router.push(`/mnemonics?mnemonics=${res}&password=${password}`);
  };

  return (
    <div className="container">
      <div className="">
        <Logo />
      </div>
      <h2 className="text-[18px] font-semibold text-center my-12">
        Choose a password for your wallet
      </h2>
      <div className="">
        <div className="flex flex-col gap-6 items-center">
          <input
            type="password"
            placeholder="Enter new password"
            onChange={onChangeHandler}
            className="p-3 bg-white w-[100%] rounded-lg placeholder:text-blue-950 outline-none "
            id="password"
            name="password"
          />

          <input
            type="password"
            placeholder="Confirm password"
            onChange={onChangeHandler}
            className="p-3 bg-white w-[100%] rounded-lg placeholder:text-blue-950 outline-none "
            id="confirmPass"
            name="confirmPass"
          />

          {/* password mismatch error   */}
          {!matched && (
            <Error>Password Mismatched</Error>
          )}

          <div className="w-[100%] flex items-center gap-2 mt-4">
            <input type="checkbox" className="h-4 w-4" /> I have read all the
            Terms and Conditions
          </div>

          <button
            className=" bg-blue text-[18px] font-normal text-white w-[240px]  h-[50px] rounded-lg shadow-lg mt-20 hover:animate-pulse"
            onClick={handleMnemonics}
          >
            Continue
          </button>
          <span className="text-[18px] font-normal italic mt-[-10px] underline cursor-pointer">
            Cancel Process
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
