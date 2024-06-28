import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GrTransaction } from "react-icons/gr";
import { IoAnalytics, IoSettings } from "react-icons/io5";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";

const menus = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    href: "/admin/dashboard",
  },
  {
    title: "Product",
    icon: <RiShoppingCartLine />,
    href: "/admin/products",
  },
  {
    title: "Accounts",
    icon: <MdManageAccounts />,
    href: "#",
  },
  {
    title: "Transaction",
    icon: <GrTransaction />,
    href: "#",
  },
  {
    title: "Analytics",
    icon: <IoAnalytics />,
    href: "#",
  },
  {
    title: "Settings",
    icon: <IoSettings />,
    href: "#",
  },
];

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <div className="bg-white w-[300px] min-h-screen p-4 shrink-0">
      <div className=" flex items-center gap-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoJWrjW5apSBex6uFgf06uFhaYZ16_m69-2w&s"
          className="size-12 rounded-lg"
          alt="logo image"
        />
        <h2 className="text-[20px] font-semibold">The Brave Coder</h2>
      </div>
      <ul className="space-y-4 mt-6">
        {menus.map((menu) => (
          <Link
            href={menu.href}
            key={menu.title}
            className={`flex gap-2 items-center p-4 rounded-lg cursor-pointer hover:bg-pink hover:text-white ${
              pathName === menu.href ? "bg-pink text-white" : "bg-gray-50"
            }`}
          >
            <div className="text-[20px]">{menu.icon}</div>
            <p>{menu.title}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
