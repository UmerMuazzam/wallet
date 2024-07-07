"use client";

import { decryptMnemonics } from "@/utils/generateMnemonics";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const searchParams = useSearchParams();

  const handleDecryption = async () => {
    const mnemmonics = localStorage.getItem("mnemmonics");

    if (password.length < 8) return;
    await decryptMnemonics(password, mnemmonics, setWrongPass, setNavigate);

    if (navigate) {
      router.push(`/dashboard`);
    }
  };

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
