"use client";

import Button from "@/components/Button";
import Error from "@/components/Error";
import Logo from "@/components/Logo";
import { createAccount, encryptMnemonics } from "@/utils/walletUtilities";
import { useRouter } from "next/navigation";
import React from "react";
 
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  mnemonics: Yup.string()
    .min(50, "Too Short! Minimum 50 Characters")
    .max(120, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  confirmPass: Yup.string().required("Required").oneOf([Yup.ref("password"), null], "Passwords must match"),
});



const page = () => { 
  const router = useRouter();

  return (
    <>
      <Logo />
      <Formik
        className="container text-center"
        initialValues={{
          mnemonics: "",
          password: "",
          confirmPass: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={ async(values) => { 
          console.log(values);
          await createAccount(mnemonics);
          await encryptMnemonics(password, mnemonics);
          router.push("/dashboard");
        }}
      >
        {({ errors, touched }) => (
          <Form className="container text-center">
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
              Creata Chain does not keep a copy of your password. If you’re
              having trouble unlocking your account, you will need to reset your
              wallet. You can do this by providing the Secret Recovery Phrase
              you used when you set up your wallet.
            </div>

            <Field
              type="text"
              placeholder="Mnemonics phrase"
              id="mnemonics"
              name="mnemonics"
              className="w-[100%] mb-6 bg-white rounded-md outline-none p-3"
            />
            {errors.mnemonics && touched.mnemonics ? (
              <Error>{errors.mnemonics}</Error>
            ) : null}

            <Field
              type="password"
              placeholder="Enter new password"
              id="password"
              name="password"
              className="p-3 my-6 bg-white w-[100%] rounded-md outline-none focus:outline-none focus:bg-white"
            />
            {errors.password && touched.password ? (
              <Error>{errors.password}</Error>
            ) : null}

            <Field
              type="password"
              placeholder="Confirm password"
              id="confirmPass"
              name="confirmPass"
              className="p-3 my-6 bg-white w-[100%] rounded-md outline-none"
            />
            {errors.confirmPass && touched.confirmPass ? (
              <Error>{errors.confirmPass}</Error>
            ) : null}

            <div style={{ marginTop: "1.5rem" }}>
              <Button>Login</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default page;
