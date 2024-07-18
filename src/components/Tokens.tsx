"use client"

import { abi } from "@/utils/abi";
import { myContract } from "@/utils/walletUtilities";
import Image from "next/image";
import React, { useState } from "react";

const Tokens = () => {
    const [showInputField,setShowInputField] =useState(false)
    const [tokenAddress, setTokenAddress] = useState(""); 

    const handleShowInputToken = () => {
        setShowInputField(true)
    };
    const handleTokenAddress = () => {
        try {
           const { name, symbol, totalSupply } = myContract(abi, tokenAddress);
        } catch (error) {
            console.log("some thing went wrong",error)
        }
    };
  return (
    <div className="my-6">
      {/* importing tokens  */}
      <h3
        className="text-blue font-semibold text-[14px] text-right mt-[-16px] cursor-pointer"
        onClick={handleShowInputToken}
      >
        Import Tokens
      </h3>

      {showInputField && (
        <div className="flex justify-end flex-col gap-2  mt-4">
          <input
            value={tokenAddress}
            onChange={(e)=>setTokenAddress(e.target.value)}
            type="text"
            className=" outline-none border bg-white rounded-md px-3 py-1"
          />
          <button
            className="text-blue font-semibold border w-24 p-1 m-auto bg-white rounded-md"
            onClick={handleTokenAddress}
          >
            Next
          </button>
        </div>
      )}

      <div className="flex gap-4 items-center text-[14px] font-semibold ">
        <div>
          <Image
            className="py-2 px-3 rounded-lg shadow-md bg-white my-2"
            src="/creata.svg"
            height={48}
            width={48}
            alt="Creata logo"
          />
        </div>
        <div>
          <div>CreataChain</div>
          <div className="text-blue">0 CTA</div>
        </div>
      </div>
    </div>
  );
};

export default Tokens;
