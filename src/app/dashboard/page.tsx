"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { getDetails } from "@/utils/walletUtilities";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import History from "@/components/History";
import Tokens from "@/components/Tokens";
import BasicTabs from "@/components/DashboardTabs";

const page = () => {
  const isLogin = localStorage.getItem("password") || false;
  const transactionHistoryString = localStorage.getItem("transactionHistory");
  const transactionHistory = JSON.parse(transactionHistoryString);

  const [showHistory, setShowHistory] = useState(false);
  const [showTokens, setShowTokens] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accAddress, setAccAddress] = useState("");
  const [accBallance, setAccBallance] = useState("");
  const router = useRouter();

  const handleLogout = (e) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("password");
      router.push(`/`);
    }, 1000);
  };

  const getData = async () => {
    const { address, ballance } = await getDetails();
    setAccAddress(address);
    setAccBallance(ballance);
  };

  const handleSendTransaction = () => {
    setLoading(true);
    setTimeout(() => {
      router.push(`/dashboard/transaction?ballance=${accBallance}`);
    }, 1000);
  };
  const handleRecieve = () => {
    setLoading(true);
    setTimeout(() => {
      router.push(`/dashboard/receive?address=${accAddress}`);
    }, 1000);
  };

  const handleShowHistory = () => {
    setShowHistory(true);
    setShowTokens(false);
  };
  const handleShowTokens = () => {
    setShowHistory(false);
    setShowTokens(true);
  };

  useEffect(() => {
    getData();
  }, [accAddress]);

  if (!isLogin) return router.push("/");

  return (
    <div className="container relative ">
      <div className="flex  justify-between rounded-t-md items-center  m-auto p-4 bg-slate-50">
        <Link href="/">
          <Image src="/creata.svg" height={34} width={34} alt="Creata logo" />
        </Link>
        <span className="py-2 px-4   font-semibold bg-white rounded">
          Zenith Chain
        </span>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton>
              <Image
                className="w-9 h-9 shadow-md cursor-pointer rounded-xl p-2 bg-white"
                src="/account.svg"
                width={10}
                height={10}
                alt="Creata logo"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <form action={handleLogout}>
                <MenuItem>
                  <button
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </Menu>
      </div>
      <div className=" mx-auto h-[2px]  bg-white"></div>
      <div className="flex  flex-col   max-w-[900px] m-auto py-3 px-4 text-left bg-slate-50 rounded-b-md shadow-xl">
        <div className="flex flex-col gap-1  mb-6">
          <span className="text-[16px] text-left font-semibold">
            Main Account{" "}
          </span>{" "}
          <span className="text-[13px]  text-gray-500">{accAddress}</span>
        </div>
        <div className="flex flex-col items-center justify-center p-8  bg-slate-50  rounded-xl border-2 border-white">
          <div className="flex gap-6">
            <span className="flex flex-col items-center">
              <Image
                className="py-2 px-3 rounded-lg shadow-md bg-white my-2"
                src="/creata.svg"
                height={48}
                width={48}
                alt="Creata logo"
              />
              <span className="text-blue font-bold text-[18px]">
                {accBallance} ETH
              </span>
            </span>
          </div>

          <div className="flex gap-4 mt-6 ">
            <span
              className="rounded-lg w-28 flex items-center justify-center shadow-md h-16 bg-white cursor-pointer  hover:shadow-xl"
              onClick={handleSendTransaction}
            >
              Send
            </span>
            <span
              className="rounded-lg w-28 flex items-center justify-center shadow-md h-16 bg-white cursor-pointer hover:shadow-xl"
              onClick={handleRecieve}
            >
              Receive
            </span>
          </div>
        </div>

        <BasicTabs
          myValue="Amount Send"
          transactionHistory={transactionHistory}
        />
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default page;
