"use client";

import { abi } from "@/utils/abi";
import { getTokenDetails, myContract, web3 } from "@/utils/walletUtilities"; 
import React, { useEffect, useState } from "react";
import Error from "./Error";
import TokensList from "./TokensList";
import Link from "next/link"; 
import Loader from "./Loader";

const address = localStorage.getItem("address");
console.log("address", address);

const Tokens = () => {

  const [contractDetails, setContractDetails] = useState([]);
   
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const [showInputField, setShowInputField] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");

  // to show the input field
  const handleShowInputToken = () => {
    setShowInputField(true);
  };


  // add the token to the list of tokens
  const handleTokenAddress = async () => {
    setLoading(true)

    setError("")
    const res = await getTokenDetails(abi, tokenAddress, address);
    if(res.error){
      console.error("Token addressis not valid ")
      setError("Token address is not valid")
      setLoading(false);
      return;
    }
    setTokenAddress("");
    try {
      await myContract(tokenAddress);
      setTimeout(() => {
        myTokenGetDetails();
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log("some thing went wrong", error);
    }
  };

  async function myTokenGetDetails() {
    try {
      let tokensAddress = JSON.parse(localStorage.getItem("tokensAddress"));
      tokensAddress = tokensAddress[address]; 

      const response = tokensAddress.map((element) =>
        getTokenDetails(abi, element.deployedAddress,address)
      );
      const promise = await Promise.all(response);
      
      setContractDetails(promise);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    myTokenGetDetails();
  }, [address]);

  return (
    <div className="my-6">
      <div
        className="text-blue font-semibold text-[14px] text-right mt-[-16px] cursor-pointer"
        onClick={handleShowInputToken}
      >
        Import Tokens
      </div>

      {showInputField && (
        <div className="flex justify-end flex-col gap-2  mt-4">
          <input
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            type="text"
            className=" outline-none border bg-white rounded-md px-3 py-1"
          />
          <button
            className="text-blue font-semibold border w-24 p-1 m-auto bg-white rounded-md"
            onClick={handleTokenAddress}
          >
            Next
          </button>
          {error && <Error>{error}</Error>}
        </div>
      )}

      <TokensList contractDetails={contractDetails} />

      <Link href="/dashboard/sendTokenDetails">
        <div className="text-[14px] text-blue font-semibold text-right cursor-pointer mt-4">
          Token Transaction
        </div>
      </Link>

     {loading && <Loader/>}
    </div>
  );
};

export default Tokens;
