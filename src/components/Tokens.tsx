"use client";

import { abi } from "@/utils/abi";
import { getTokenDetails, myContract, web3 } from "@/utils/walletUtilities";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Error from "./Error";
import TokensList from "./TokensList";

const address = localStorage.getItem("address");
console.log("address", address);

const Tokens = () => {
  const [contractDetails, setContractDetails] = useState([]);
  const [error, setError] = useState("");
  console.log("contractDetails", contractDetails);

  const [showInputField, setShowInputField] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");

  const handleShowInputToken = () => {
    setShowInputField(true);
  };
  const handleTokenAddress = async () => {
    setTokenAddress("");
    try {
      await myContract(tokenAddress);

      myTokenGetDetails();
    } catch (error) {
      console.log("some thing went wrong", error);
    }
  };

  async function myTokenGetDetails() {
    try {
      let tokensAddress = JSON.parse(localStorage.getItem("tokensAddress"));
      tokensAddress = tokensAddress[address];
      console.log("tokensAddress", tokensAddress);

      const response = tokensAddress.map((element) =>
        getTokenDetails(abi, element.deployedAddress)
      );
      const promise = await Promise.all(response);
      console.log(promise);

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
    </div>
  );
};

export default Tokens;
