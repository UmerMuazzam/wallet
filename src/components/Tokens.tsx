"use client"

import { abi } from "@/utils/abi";
import { getTokenDetails, myContract, web3 } from "@/utils/walletUtilities";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Error from "./Error";

 const address = localStorage.getItem("address");
 console.log("address", address);

const Tokens = () => {
  const [contractDetails, setContractDetails] = useState([]);
  const [error, setError] = useState("");
  console.log("contractDetails", contractDetails)

    const [showInputField,setShowInputField] =useState(false)
    const [tokenAddress, setTokenAddress] = useState(""); 

    const handleShowInputToken = () => {
        setShowInputField(true)
    };
    const handleTokenAddress = async() => {
      setTokenAddress("");
        try {
          await myContract(tokenAddress);

          myTokenGetDetails();
        } catch (error) {
            console.log("some thing went wrong",error)
        }
    };

    async function myTokenGetDetails() {
      try {
        let tokensAddress = JSON.parse(localStorage.getItem("tokensAddress"));
        tokensAddress = tokensAddress[address]; 
        console.log("tokensAddress", tokensAddress);
          
            if (!web3.utils.isAddress(tokensAddress)) {
              console.log("Invalid address");
              setError("Invalid address");
              return;
            }
          
    
        const response = tokensAddress.map((element) =>
          getTokenDetails(abi, element.deployedAddress)
        );
        const promise = await Promise.all(response);
        console.log(promise);
         
        setContractDetails(promise); 
      } catch (error) {
        console.log(error) 
      }
    }

    useEffect(()=>{
      myTokenGetDetails()
    },[address])


  return (
    <div className="my-6">
      {/* importing tokens  */}
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

      {contractDetails?.map((item,i) => (
        <div
          key={i}
          className="flex gap-4 items-center text-[14px] font-semibold "
        >
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
            <div>{item?.name}</div>
            <div className="text-blue">{item?.totalSupply} CTA</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tokens;



 

 