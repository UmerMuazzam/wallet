 "use client"

import { getDetails } from "@/utils/generateMnemonics";
import { useEffect, useState } from "react";

const page = () => {
    const [accAddress,setAccAddress] =useState("")
    const [accBallance, setAccBallance] = useState("");
    console.log("accAddress",accAddress)
    console.log("accBallance",accBallance)

    const getData= async()=>{
        const { address, ballance } =await getDetails();
        setAccAddress(address);
        setAccBallance(ballance); 
    }
 
    useEffect(()=>{
        getData()
    },[])

  return (
    <div className="container">
      <h1>Your Creata chain wallet</h1>
      <div>
        <span>Address : </span> <span>{accAddress}</span>
      </div>
      <div>
        <span>Amount :</span> <span>{accBallance}</span>
      </div>
    </div>
  );
}

export default page
