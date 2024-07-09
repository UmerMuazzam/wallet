"use client";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { decryptMnemonics, transferEther } from "@/utils/walletUtilities";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const ballance = searchParams.get("ballance");
  const router = useRouter();
  const [checkPass, setCheckPass] = useState(false);
  const mnemonics = localStorage.getItem("mnemonics");
  const localPass = localStorage.getItem("password");
  console.log("localPass ", localPass);

  const handleSubmit = async (formData) => {
    const myAdd = localStorage.getItem("address");
    const recieverAdd = formData.get("address");
    const password = formData.get("password");
    const amount = formData.get("amount");

    if (password.length < 8)
      return alert("Password must be at least of 8 characters");

    try {
      const res = await decryptMnemonics(
        password,
        mnemonics,
        router,
        setCheckPass,
        "/dashboard"
      );
      const txReceipt = await transferEther(myAdd, recieverAdd, amount);
      //   router.push("/dashboard")
    } catch (error) {
      console.log(error, "something went wrong");
      setCheckPass(true);
    }
  };

  return (
    <div className="container  text-center">
      <div>
        <Logo />
        <h3 className="text-[18px] font-semibold my-8">
          Send your transaction to the Ethereum blockchain
        </h3>
        <form
          action={handleSubmit}
          className="flex flex-col bg-slate-50 py-4 justify-center items-center rounded-md"
        >
          <span className="flex w-[100%] pt-8 px-8 gap-4   items-center">
            <span className="font-bold w-20">Password</span>
            <input
              className="p-3 bg-white w-[90%] rounded-md outline-none"
              type="text"
              placeholder="Please Enter password"
              id="password"
              name="password"
              required
            />
          </span>
          <span className="flex w-[100%] pt-8 px-8 gap-4  first-letter: items-center">
            <span className="font-bold w-20">Address</span>
            <input
              className="p-3   bg-white w-[90%] rounded-md outline-none"
              type="text"
              placeholder="Please Enter reciever address"
              id="address"
              name="address"
              required
            />
          </span>
          <span className="flex w-[100%] p-8  gap-4   items-center">
            {" "}
            <span className="font-bold w-20">Amount</span>
            <input
              className="p-3   bg-white w-[90%] rounded-md outline-none"
              type="number"
              placeholder="Please Enter amount to send"
              id="amount"
              name="amount"
              required
            />
          </span>
          <Button>Send</Button>
        </form>
      </div>
      {checkPass && (
        <div className="text-red-500 my-2 ">Please provide valid password</div>
      )}
    </div>
  );
};

export default page;
