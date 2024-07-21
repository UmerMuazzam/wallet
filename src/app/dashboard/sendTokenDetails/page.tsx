"use client";

import BackButton from "@/components/BackButton";
import History from "@/components/History";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const transactionHistory = [
  { from: "k234q3e", to: "9989asdfasdf", value: 9 },
  { from: "bxcb45", to: "ghsdfgsfgas", value: 66 },
  { from: "jgf5634", to: "67dhsdfg", value: 5 },
  { from: "xdfsdfs", to: "89hdfgh", value: 1 },
];

const page = () => {
  // const gasPrice = await web3.eth.getGasPrice();
  //   const gasLimit = await contract.methods
  //     .transfer(receiverAddress, amount.toString())
  //     .estimateGas({ from: address });

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
              <form>
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
      <div className=" relative bg-slate-50 py-16 pl-16">
        <BackButton link={"/dashboard"}>Back</BackButton>

        <History transactionHistory={transactionHistory} />
      </div>
    </div>
  );
};

export default page;
