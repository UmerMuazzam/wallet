"use client";

import { createAccount, encryptMnemonics } from "@/utils/generateMnemonics";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  const handleForm = async (formData) => {
    const mnemonics = formData.get("mnemonics");
    const password = formData.get("password");

    if (mnemonics.split(" ").length != 12)
      return alert("Please enter 12 mnemonics not less than 12 nor greater");
    await createAccount(mnemonics);
    await encryptMnemonics(password, mnemonics);
    router.push("/dashboard");
  };

  return (
    <div className="container">
      <form action={handleForm}>
        <h2 style={{ marginBottom: "1rem" }}>Please enter mnemonics </h2>
        <textarea
          style={{
            height: "20vh",
            width: "100%",
            border: "2px solid gray",
            outline: "none",
            padding: "1rem",
            borderRadius: "4px",
          }}
          type="textarea"
          placeholder="Mnemonic words "
          required
          id="mnemonics"
          name="mnemonics"
        />
        <h3>Please enter password</h3>

        <input
          type="text"
          placeholder="Enter new password"
          required
          id="password"
          name="password"
          className="py-2 bg-slate-100 rounded w-96 text-black outline-none"
        />
        <button
          type="submit"
          className="py-[10px] cursor-pointer flex-grow-0  px-6 bg-slate-400 rounded w-96 text-white hover:bg-white hover:text-black border"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default page;
