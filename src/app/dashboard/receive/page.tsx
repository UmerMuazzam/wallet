"use client";

import Logo from "@/components/Logo";
import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();

  const address = searchParams.get("address");
  return (
    <div>
      <div className="mb-20">
        <Logo />
      </div>
      <div className="container bg-slate-50 mx-auto flex flex-col gap-6 p-4">
        <div className="p-4">
          <h3>Main Account</h3>
          <div className="">
            <QRCodeCanvas value={address} />
          </div>
          <div>
            {" "}
            <span className="text-gray-500 font-bold">Address : </span>{" "}
            <span>{address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
