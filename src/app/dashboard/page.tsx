"use client";

import { getDetails } from "@/utils/generateMnemonics";
import Image from "next/image";
import { useEffect, useState } from "react";

const page = () => {
  const [accAddress, setAccAddress] = useState("");
  const [accBallance, setAccBallance] = useState("");

  const getData = async () => {
    const { address, ballance } = await getDetails();
    setAccAddress(address);
    setAccBallance(ballance);
  };

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
            <span>{accBallance} CTA</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="rounded p-8 bg-white">Send</span>
            <span className="rounded p-8 bg-white">Receive</span>
            <span className="rounded p-8 bg-white">ICP Send</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
