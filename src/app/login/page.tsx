"use client";

import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="container">
      <div className="h-container">
        <Logo />
      </div>
      <div className="createAcc">
        <h3 className="my-4">
          <b>Wellcome Back:</b> Unlock your wallet account by providing password
        </h3>

        <input
          type="text"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="py-2 bg-slate-100 rounded w-96 text-black outline-none"
        />
        <span
          className="py-[10px] cursor-pointer  px-6 bg-slate-400 rounded w-96 text-white hover:bg-white hover:text-black border"
          onClick={handleDashboard}
        >
          Unlock
        </span>
      </div>
    </div>
  );
};

export default page;
