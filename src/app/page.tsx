 "use client"

import { useState } from "react";

const page = () => {
  const [createAcc,setCreateAcc] =useState(false)
  const [restoreAcc, setRestoreAcc] = useState(false);

  const handleAccount=()=>{
    setCreateAcc(true)
    setRestoreAcc(false)
  }
  const restoreAccount = () => {
    setRestoreAcc(true);
    setCreateAcc(false);
  };
  return (
    <div>
      <div>
        <h1>Creata chain wallet</h1>
      </div>

      <div>
        <button onClick={handleAccount}>Create wallet</button> <br />
        <button onClick={restoreAccount}>Restore wallet</button>
      </div>

      {/* create account  */}
      {createAcc && <div> 
        
        Enter new password <br />
        <input type="text" placeholder="new password" />
        </div>}
      {/* restore account  */}
      {restoreAcc && <div> restored</div>}
    </div>
  );
}

export default page
