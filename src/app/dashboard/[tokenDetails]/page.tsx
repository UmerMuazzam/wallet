"use client";

import BackButton from "@/components/BackButton";
import { abi } from "@/utils/abi";
import { getTokenDetails } from "@/utils/walletUtilities";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [detail, setDetail] = useState("");
  const router = useRouter();
  const { tokenDetails } = useParams();
  console.log("detail", detail);

  const handleSendNavigate = () => {
    router.push(
      `sendToken?totalSupply=${detail?.totalSupply}&name=${detail?.name}&deployedAddress=${detail?.deployedAddress}`
    );
  };

  async function getData() {
    let res = await getTokenDetails(abi, tokenDetails);
    setDetail(res);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container relative ">
      <div className="flex shadow-lg  justify-between rounded-t-md items-center  m-auto p-4 bg-slate-50">
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
      <div className="h-[50vh] relative bg-slate-50 shadow-lg rounded-b-lg">
        <BackButton link={"/dashboard"}>Back</BackButton>

        <div className="flex flex-col pt-24 items-center gap-4">
          <div className="text-xl font-semibold">
            {" "}
            {detail.totalSupply} {detail.symbol}{" "}
          </div>

          <Image
            onClick={handleSendNavigate}
            className="bg-blue rounded-full p-3 shadow-xl cursor-pointer  "
            src="/send.svg"
            alt="Send"
            height={64}
            width={64}
          />

          <span className="font-semibold text-[14px]">Send</span>
        </div>
      </div>
    </div>
  );
};

export default page;
