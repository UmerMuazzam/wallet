"use client";

import Logo from "@/components/Logo";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const isLogin = localStorage.getItem("password") || false;

  const router = useRouter();

  const handleAccount = () => {
    router.push("/create");
  };
  const handleRestore = () => {
    router.push("/restore");
  };

  if (isLogin) return router.push("/dashboard");

  return (
    <div className="container md:mx-auto">
      <Logo />
      <div className="mt-16">
        <div className="text-center">
          <h1 className="text-[32px] font-bold">Wellcome</h1>
          <div className="text-gray-500 text-[13px] max-w-96 mx-auto my-2">
            Your are about to experience ultimate one secure stop for your
            digital wallet{" "}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4  ">
          <button
            className="flex gap-4 p-4 bg-transparent border-[2px] border-white rounded-md shadow-md"
            onClick={handleAccount}
          >
            <Image
              className="p-2 bg-white rounded"
              src="/file.svg"
              width={60}
              height={60}
              alt="File logo"
            />
            <div className="flex flex-col  items-start">
              <span className="text-[18px] font-semibold">Create Account</span>
              <span className="text-gray-500">
                Create a wallet using 12 words phrases
              </span>
            </div>
          </button>

          <button
            className="flex gap-4 p-4 bg-transparent border-[2px] border-white rounded-md shadow-md"
            onClick={handleRestore}
          >
            <Image
              className="p-2 bg-white rounded"
              src="/file.svg"
              width={60}
              height={60}
              alt="file logo"
            />
            <div className="flex flex-col  items-start">
              <span className="text-[18px] font-semibold">Restore Account</span>
              <span className="text-gray-500">
                Restore account using 12 words phrases
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
