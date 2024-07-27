import React from 'react'
import Button from './Button';

const ImportNFT = () => {
    const handleForm=()=>{
        console.log('for submit')
    }

  return (
    <div className="container relative text-center">
      <form action={handleForm}>
        <div className="flex flex-col gap-4 items-center mb-6">
          <input
            type="password"
            placeholder="Enter Token Address"
            className="px-3 py-2 bg-white w-[100%] rounded-lg placeholder:text-blue-950 outline-none "
          />
        </div>
        <div className="flex flex-col gap-4 items-center mb-6">
          <input
            type="password"
            placeholder="Enter Token ID"
            className="px-3 py-2 bg-white w-[100%] rounded-lg placeholder:text-blue-950 outline-none "
          />
        </div> 
        <button
          type="submit"
          className=" bg-blue text-[16px] font-normal text-white w-[240px]  h-[40px] rounded-lg shadow-lg  hover:animate-pulse text-center"
        >
          Import
        </button>
      </form>
    </div>
  );
}

export default ImportNFT
