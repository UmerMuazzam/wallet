import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <div className="flex items-center  text-[16px] uppercase font-semibold gap-4 justify-center mt-4">
        <Link href="/">
          <Image
            className="rounded"
            src="/creatalogo.svg"
            alt="Logo image"
            width={180}
            height={180}
          />
        </Link> 
      </div>
    </div>
  );
};

export default Logo;
