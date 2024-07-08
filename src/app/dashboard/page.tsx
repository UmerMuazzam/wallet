"use client";

import { getDetails } from "@/utils/walletUtilities";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const transactionHistoryString = localStorage.getItem("transactionHistory");
  const transactionHistory = JSON.parse(transactionHistoryString); 

  const [accAddress, setAccAddress] = useState("");
  const [accBallance, setAccBallance] = useState("");
  const router= useRouter();

  const getData = async () => {
    const { address, ballance } = await getDetails();
    setAccAddress(address);
    setAccBallance(ballance);
  };

  const handleSendTransaction=()=>{
    router.push(`/dashboard/transaction?ballance=${accBallance}`);
  }
  const handleRecieve=()=>{
    router.push(`/dashboard/receive?address=${accAddress}`);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center max-w-[900px] m-auto p-2">
        <Image src="/creata.png" height={64} width={64} alt="Creata logo" />
        <span className="py-2 px-4 w-[300px] bg-slate-100 rounded">
          Zenith Chain
        </span>
        <Image
          className="w-9 h-9 cursor-pointer rounded p-1 bg-slate-100"
          src="/account.png"
          width={24}
          height={8}
          alt="Creata logo"
        />
      </div>
      <div className="max-w-[900px] my-2 mx-auto h-[2px]  bg-slate-300"></div>
      <div className="flex  flex-col items-center max-w-[900px] m-auto p-2 text-left">
        <h1 className="mb-4">Your Creata chain wallet</h1>
        <div className="flex flex-col gap-1 w-[650px] mb-6">
          <span className="text-xl font-semibold">Main Account </span>{" "}
          <span className="text-sm text-gray-500">{accAddress}</span>
        </div>
        <div className="flex flex-col gap-8 bg-slate-100 p-8 w-[650px] h-[300px]">
          <div>
            <Image
              className="p-1 rounded shadow bg-white my-2"
              src="/creata.png"
              height={40}
              width={40}
              alt="Creata logo"
            />
            <span>{accBallance} ETH</span>
          </div>
          <div className="flex justify-between gap-8">
            <span
              className="rounded p-8 bg-white cursor-pointer"
              onClick={handleSendTransaction}
            >
              Send
            </span>
            <span className="rounded p-8 bg-white cursor-pointer" onClick={handleRecieve}>Receive</span>
            <span className="rounded p-8 bg-white cursor-pointer">
              ICP Send
            </span>
          </div>
        </div>
        <div className="w-[900px] mt-8 mb-6 mx-auto h-[2px]  bg-slate-300"></div>
        <div className="my-5">
          <h2>Record Maintained</h2>
          {transactionHistory.map((item, i) => {
            return (
              <div
                className="flex flex-col  w-[650px] p-8 gap-2 bg-slate-50 my-3"
                key={i}
              >
                <span className="text-gray-500">
                  <b>Sender</b> : {item.from}
                </span>
                <span className="text-gray-500">
                  <b>Reciever</b> : {item.to}
                </span>
                <span className="text-gray-500">
                  <b>Amount Send </b> : {item.value}
                </span>
                <span className="text-gray-500">
                  <b>Status</b> : Successfull
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;
