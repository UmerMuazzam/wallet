"use client";

import { createAccount, encryptMnemonics, generateMnemonics } from "@/utils/generateMnemonics";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const [createAcc, setCreateAcc] = useState(false);
  const [restoreAcc, setRestoreAcc] = useState(false);
  const [password, setPassword] = useState("");
  const [mnemonics, setMnemonics] = useState("");
  const [ballance, setBallance] = useState(0);
  const [address, setAddress] = useState("");  

  const router= useRouter()

  // console.log(ballance, "    ", address);

  const handleDashboard = async () => {
    const data = await createAccount(mnemonics);
    setBallance(data.ballance);
    setAddress(data.address); 
    encryptMnemonics(password, JSON.stringify(mnemonics));
    router.push(`/home?address=${data.address}&ballance=${data.ballance}`);
  };

  const handleMnemonics = () => {
    if (password.length < 8) {
      return;
    }
    const res = generateMnemonics(password);
    setMnemonics(res);
     
  };

  const handleAccount = () => {
    setCreateAcc(true);
    setRestoreAcc(false);
  };
  const restoreAccount = () => {
    setRestoreAcc(true);
    setCreateAcc(false);
  };
  return (
    <div className="container">
      <div className="h-container">
        <h1>Creata chain wallet</h1>
      </div>

      <div className="buttons">
        <button onClick={handleAccount}>Create wallet</button>
        <button onClick={restoreAccount}>Restore wallet</button>
      </div>

      {/* create account  */}
      {!mnemonics && createAcc && (
        <div className="createAcc">
          <h3>Create a new account</h3>
          <h4>Enter new password</h4>
          <br />
          <div style={{ fontSize: "13px", color: "lightgreen" }}>
            Password must be at least of 8 character
          </div>
          <input
            type="text"
            placeholder="new password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span type="button" className="create" onClick={handleMnemonics}>
            Create
          </span>
        </div>
      )}

      {/* show mnemonics dialog */}

      { mnemonics && (
        <div>
          <h3>
            MNEMONICS : NOTE IT DOWN AT SOME SAVE PLACE AS IT WILL NEVER APPEAR
            AGAIN{" "}
          </h3>
          {mnemonics} <br />
          <button className="create" onClick={handleDashboard}>
            Next
          </button>
        </div>
      )}

      {/* restore account  */} 
      
      {!mnemonics && restoreAcc && (
        <div className="createAcc">
          <h3>Restore wallet</h3>
          <h4>Enter new password</h4>
          <br />
          <div style={{ fontSize: "13px", color: "lightgreen" }}>
            Password must be at least of 8 character
          </div>
          <input
            type="text"
            placeholder="new password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="create">Restore</span>
        </div>
      )}

     


    </div>
  );
};

export default page;
