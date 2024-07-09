"use client";

import Button from "@/components/Button";
import Error from "@/components/Error";
import Logo from "@/components/Logo";
import { createAccount, encryptMnemonics } from "@/utils/walletUtilities";
import { match } from "assert";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [matched, setMatched] = useState(true);
  const router = useRouter();

  const handleForm = async (formData) => {
    const mnemonics = formData.get("mnemonics");
    const password = formData.get("password");
    const confirmPass = formData.get("confirmPass");
    console.log(
      "mnemonics",
      mnemonics,
      "password",
      password,
      "confirmPass",
      confirmPass
    );
    if (confirmPass != password) {
      setMatched(false);
      return;
    }

    const str = mnemonics.trim();

    if (str === "") {
      return 0;
    }
    const words = str.split(/\s+/);

    if (words.length != 12)
      return alert("Please enter 12 mnemonics not less than 12 nor greater");
    await createAccount(mnemonics);
    await encryptMnemonics(password, mnemonics);
    router.push("/dashboard");
  };

  return (
    <>
      <Logo />
      <div className="container text-center">
        <form action={handleForm}>
          <h2
            style={{
              marginBottom: "1rem",
              fontSize: "1.3rem",
              fontWeight: "500",
            }}
          >
            Restore Wallet
          </h2>

          <div className="bg-white p-4 text-[13px] rounded-md mb-6 text-blue">
            Creata Chain does not keep a copy of your password. If you’re having
            trouble unlocking your account, you will need to reset your wallet.
            You can do this by providing the Secret Recovery Phrase you used
            when you set up your wallet.
          </div>

          <input
            type="text"
            placeholder="Mnemonics phrase"
            id="mnemonics"
            name="mnemonics"
            className="w-[100%] bg-white rounded-md outline-none p-3"
          />

          <input
            type="password"
            placeholder="Enter new password"
            id="password"
            name="password"
            className="p-3 mt-6 bg-white w-[100%] rounded-md outline-none focus:outline-none focus:bg-white"
          />

          <input
            type="password"
            placeholder="Confirm password"
            id="confirmPass"
            name="confirmPass"
            className="p-3 mt-6 bg-white w-[100%] rounded-md outline-none"
          />
          {!matched && (
            <div className="mt-6">
              <Error>Password mismatched</Error>
            </div>
          )}
          <div style={{ marginTop: "1.5rem" }}>
            <Button>Login</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
