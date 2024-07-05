"use client";

import React from "react";

const page = () => {

    const handleForm=(formData) => {
        console.log(formData.get('mnemonics'))
    }

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
          type="text"
          placeholder="Mnemonic words "
          required
          id="mnemonics"
          name="mnemonics"
        />
        <h3>Please enter password</h3>
        <input type="text" placeholder="Enter new password" required  id="password" name="password"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default page;
