import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="h-[100vh] absolute top-0 right-0 w-[100vh] flex items-center justify-center  ">
      {/* <h3 className="text-2xl">Loading...</h3> */}
      <Image src="/loading.gif" height={200} width={200} alt="Loading..."/>
      
    </div>
  );
};

export default Loader;
