"use client";

import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const handleAccount = () => {
    router.push("/create");
  };
  const handleRestore = () => {
    router.push("/restore");
  };

  return (
    <div className="container">
      <Logo />
      <div className="text-center">
        <h1>Wellcome</h1>
        <div className="text-gray-400 max-w-96 mx-auto my-2">
          Your are about to experience ultimate one secure stop for your digital
          wallet{" "}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4 justify-center items-center">
        <button
          className="py-2 bg-slate-400 rounded w-96 text-white hover:bg-white hover:text-black border"
          onClick={handleAccount}
        >
          Create wallet
        </button>
        <button
          className="py-2 bg-slate-400 rounded w-96 text-white border hover:bg-white hover:text-black "
          onClick={handleRestore}
        >
          Restore wallet
        </button>
      </div>
    </div>
  );
};

export default page;
