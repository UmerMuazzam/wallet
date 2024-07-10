"use client";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => { 
  const router = useRouter();

  const handleContinue = () => {
    router.push(`/dashboard`);
  };

  return (
    <div className="container text-center">
      <div>
        <Logo />
      </div>
      <div>
        <Image
          className="mx-auto my-8"
          src="/success.gif"
          alt="sucsess"
          width={250}
          height={250}
        />
      </div>
      <div>
        <h2 className="text-[18px] font-normal italic">
          Your Transaction  Successfully Done
        </h2>
      </div>
      <div className="mt-16" onClick={handleContinue}>
        <Button>Continue</Button>
      </div>
    </div>
  );
};

export default page;