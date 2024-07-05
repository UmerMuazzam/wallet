"use client"

import { decryptMnemonics } from "@/utils/generateMnemonics";
import { useSearchParams } from "next/navigation";
import  { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
     const router = useRouter();
   const [password, setPassword] = useState("");
   const [wrongPass, setWrongPass] = useState(false);
   const [navigate, setNavigate] = useState(false);
   console.log(wrongPass)
   const searchParams = useSearchParams();
    
   const handleDecryption= async()=>{ 
     console.log("handleDecryption");
    if(password.length < 8) return
     await decryptMnemonics(password, setWrongPass, setNavigate);
      
     if (navigate) {
       console.log("navigate to dashboard");
       router.push(`/dashboard`);
     }
   }
    
  return (
    <div className="container">
      <div className="createAcc">
        <h4>Enter password</h4>
        <input
          type="text"
          placeholder="new password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span type="button" className="create" onClick={handleDecryption}>
          Login
        </span>
      </div>

      {/* wrong password  */}
      {wrongPass && <div>Please provide valid password </div>}
    </div>
  );
};

export default page;
