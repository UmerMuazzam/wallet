"use client";

import Button from "@/components/Button";
import Error from "@/components/Error";
import Loader from "@/components/Loader";
import Logo from "@/components/Logo";
import { decryptMnemonics } from "@/utils/walletUtilities";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const router = useRouter();
  const mnemonics = localStorage.getItem("mnemonics");

  const handleDashboard = async () => {
    if (password.length < 8) {
      setCheckPass("Password cannot be less than 8 characters");
      return;
    }
    try {
      const res = await decryptMnemonics(password, mnemonics);
      if (!res.ok) {
        setCheckPass(res.message);
        return;
      }
      localStorage.setItem("password", password);
      setLoading(true);
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 1000);

    } catch (error) {
      console.log(error, "something went wrong");
    }
  };

  return (
    <div className="container relative text-center">
      <Image
        className="mx-auto"
        src="/login.svg"
        alt="login logo"
        width={264}
        height={264}
      />

      <h2 className="text-[32px] text-black mt-5 mb-2 font-semibold">
        Welcome Back!
      </h2>
      <h3 className="text-gray-600 mb-6  text-[15px]">
        To the Creata Chain blockchain
      </h3>
      <div className="">
        <div className="flex flex-col gap-4 items-center">
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 bg-white w-[70%] rounded-lg placeholder:text-blue-950 outline-none "
          />
          {/* error validation  */}
          {checkPass && <Error> {checkPass}</Error>}

          <button className="mt-4" onClick={handleDashboard}>
            <Button>Unlock</Button>
          </button>
        </div>
      </div>

      <div className="mt-20 italic cursor-pointer">
        Need help?{" "}
        <span className="text-blue cursor-pointer">
          Check out Creata Chain Guides!
        </span>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default page;
