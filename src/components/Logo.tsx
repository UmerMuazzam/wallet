import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div>
      <div className="flex items-center gap-1 text-2xl uppercase font-semibold justify-center">
        <Image src="/creata.png" alt="Logo image" width={64} height={64} />
        <span>creatachain</span>
      </div>
    </div>
  );
};

export default Logo;
