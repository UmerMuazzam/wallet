"use client";

import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import Logo from "@/components/Logo";
import { createAccount, encryptMnemonics } from "@/utils/walletUtilities";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const mnemonics = searchParams.get("mnemonics")?.split(" ");
  const password = searchParams.get("password");

  const handleLogin = async () => {
    setLoading(true)
    await encryptMnemonics(password, searchParams.get("mnemonics"));
    await createAccount(searchParams.get("mnemonics"));
    setTimeout(() => {
      router.push(`/walletCreated?mnemonics=${searchParams.get("mnemonics")}`); 
    }, 1000);
  };

  return (
    <div className="container relative">
      <BackButton link="/create" />
      <Logo />

      <div>
        <div className="text-[18px] text-center font-semibold my-4 mt-[48px]">
          Write down your backup seed phrase
        </div>
        <div className="max-w-[480px] italic text-[16px] font-normal text-blue m-auto text-blue-500 bg-white py-4 px-6 rounded-lg">
          Please Note It Down Some Save Place, and never reveal it to some one,
          it will also never appear again{" "}
        </div>
      </div>

      <div className="flex gap-4 justify-center items-center mt-10 mb-8 mx-auto flex-wrap  ">
        {mnemonics?.map((item, i) => {
          return (
            <span key={i} className="bg-white p-4 min-w-40 text-left rounded">
              {item}
            </span>
          );
        })}
      </div>

      <div className="text-center mt-16" onClick={handleLogin}>
        <Button>Continue</Button>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default page;
