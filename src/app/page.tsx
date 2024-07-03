 "use client"

import { useState } from "react";

const page = () => {
  const [createAcc,setCreateAcc] =useState(false)
  const [restoreAcc, setRestoreAcc] = useState(false);
  const [password, setPassword] = useState("");
  const [mnemonics, setMnemonics] = useState("");
  // console.log(password)


   

  const handleAccount=()=>{
    setCreateAcc(true)
    setRestoreAcc(false)
  }
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
      {createAcc && (
        <div className="createAcc">
          <h3>Create a new account</h3>
          <h4>Enter new password</h4>
          <br />
          <input
            type="text"
            placeholder="new password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}
      {/* restore account  */}
      {restoreAcc && (
        <div className="createAcc">
          <h3>Restore wallet</h3>
          <h4>Enter new password</h4>
          <br />
          <input
            type="text"
            placeholder="new password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default page
