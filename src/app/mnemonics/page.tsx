"use client";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="container">
      <Logo />

      <div>
        <div className="text-xl font-semibold my-4">
          Write down your backup seed phrase
        </div>
        <div className="max-w-[440px] m-auto text-blue-500 bg-slate-100 p-4">
          Please Note It Down Some Save Place, and never reveal it to some one,
          it will also never appear again{" "}
        </div>
      </div>

      <div className="flex gap-2 justify-center items-center mt-10 mb-8 mx-auto flex-wrap w-[600px]">
        <span className="bg-slate-100 p-4 min-w-32 text-left rounded">
          1 sheild
        </span>
        <span className="bg-slate-100 p-4 min-w-32 text-left rounded">
          1 sheild
        </span>
        <span className="bg-slate-100 p-4 min-w-32 text-left rounded">
          1 sheild
        </span>
        <span className="bg-slate-100 p-4 min-w-32 text-left rounded">
          1 sheild
        </span>
        <span className="bg-slate-100 p-4 min-w-32 text-left rounded">
          1 sheild
        </span>
        <span className="bg-slate-100 p-4 min-w-32 text-left rounded">
          1 sheild
        </span>
      </div>

      <div onClick={handleLogin}>
        <Button>Continue</Button>
      </div>
    </div>
  );
};

export default page;
