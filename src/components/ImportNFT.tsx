import { tokenURIABI } from '@/utils/nftABI';
import { getNFTContract } from '@/utils/walletUtilities';
import React, { useEffect, useState } from 'react' 
import Error from './Error';
import { useRouter } from 'next/navigation';
import Loader from './Loader';
import TokensList from './TokensList';
import NFTList from './NFTList';


const ImportNFT = () => {
  const address = localStorage.getItem("address") || "";
  let contractDetails = [];
  if (localStorage.getItem("nftTokenDetails")) {
    contractDetails = JSON.parse(localStorage.getItem("nftTokenDetails"))[
      address
    ];
  } 
  const [error,setError]=useState("")
  const [loader, setLoader] = useState(false);
  const router= useRouter()

const handleForm =async(event) => {
  event.preventDefault(); 
  setLoader(true)

  const tokenAddress = event.target.tokenAddress.value;
  const tokenId = event.target.tokenId.value;
 
  if (!tokenAddress.length || !tokenId.length){
    setError("Please fill both fields")
    setLoader(false)
    return;
  }
    const response = await getNFTContract(
      tokenURIABI,
      tokenAddress,
      tokenId,
      address
    );
  if(!response.ok){
    setError(response.error)
    setLoader(false)
  }
  else if(response.allready){
    setError("Token already imported")
    setLoader(false)
  }
  else{
    setLoader(false);
    router.push('/dashboard')
    setError("")
  }


};

// useEffect(() => {}, [loader]);

    
  return (
    <div className="container relative text-center">
      <form onSubmit={handleForm}>
        <div className="flex flex-col gap-4 items-center mb-6">
          <input
            name="tokenAddress"
            id="tokenAddress"
            type="text"
            placeholder="Enter Token Address"
            className="px-3 py-2 bg-white w-[100%] rounded-lg placeholder:text-blue-950 outline-none "
          />
        </div>
        <div className="flex flex-col gap-4 items-center mb-6">
          <input
            name="tokenId"
            id="tokenId"
            type="text"
            placeholder="Enter Token ID"
            className="px-3 py-2 bg-white w-[100%] rounded-lg placeholder:text-blue-950 outline-none "
          />
        </div>
        <button
          type="submit"
          className=" bg-blue mb-6 text-[16px] font-normal text-white w-[240px]  h-[40px] rounded-lg shadow-lg  hover:animate-pulse text-center"
        >
          Import
        </button>
      </form>
      {error && (
        <div className="mb-4">
          <Error>{error}</Error>
        </div>
      )}
      {loader && (
        <div className="container left-14 relative  top-[-600px]">
          <Loader />
        </div>
      )}

      <NFTList contractDetails={contractDetails} />
    </div>
  );
}

export default ImportNFT
