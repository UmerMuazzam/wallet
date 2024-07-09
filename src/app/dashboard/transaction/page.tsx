"use client";

import Logo from "@/components/Logo";
import { decryptMnemonics, transferEther } from "@/utils/walletUtilities";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const ballance = searchParams.get("ballance");
  const router= useRouter()
    const [checkPass, setCheckPass]=useState(false);
    const mnemonics = localStorage.getItem("mnemonics");

  const handleSubmit = async (formData) => {
    const myAdd= localStorage.getItem("address")
    const recieverAdd = formData.get("address");
    const password = formData.get("password");
    const amount = formData.get("amount");
 
    if(password.length < 8) return alert("Password must be at least of 8 characters")
     

    try {
      const res = await decryptMnemonics(
        password,
        mnemonics,
        router,
        setCheckPass,
        "/dashboard"
      );
      const txReceipt= await transferEther(myAdd, recieverAdd, amount);
    //   router.push("/dashboard")

    } catch (error) {
      console.log(error, "something went wrong");
      setCheckPass(true); 
    }
     
  };

  return (
    <div className="container">
      <div>
        <Logo />
        <h3>Send your transaction to the Ethereum blockchain</h3>
        <form
          action={handleSubmit}
          className="flex flex-col bg-slate-50 py-4 justify-center items-center"
        >
          <span>
            Password{" "}
            <input
              className="w-[400px] outline-none"
              type="text"
              placeholder="Please Enter password"
              id="password"
              name="password" required
            />
          </span>
          <span>
            Address{" "}
            <input
              className="w-[400px] outline-none"
              type="text"
              placeholder="Please Enter reciever address"
              id="address"
              name="address" required
            />
          </span>
          <span>
            {" "}
            Amount{" "}
            <input
              className="w-[400px] outline-none"
              type="number"
              placeholder="Please Enter amount to send"
              id="amount"
              name="amount" required
            />
          </span>
          <button
            type="submit"
            className="py-[10px] cursor-pointer flex-grow-0  px-6 bg-blue-500 rounded w-32 ml-12 text-white hover:bg-white hover:text-black border"
          >
            Submit
          </button>
        </form>
      </div>
      {checkPass &&<div className="text-red-500 my-2 ">Please provide valid password</div>}
    </div>
  );
};

export default page;
