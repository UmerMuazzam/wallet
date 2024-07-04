"use client"

import { useSearchParams } from "next/navigation";
import  { useState } from "react";

const page = () => {
   const [password, setPassword] = useState("");
   const searchParams = useSearchParams();
    
    
  return (
    <div className="container">
      <div className="createAcc">
        <h4>Enter password</h4>
        <input
          type="text"
          placeholder="new password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span type="button" className="create">
          Login
        </span>
      </div>
    </div>
  );
};

export default page;
