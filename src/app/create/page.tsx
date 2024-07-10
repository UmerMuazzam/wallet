"use client";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Error from "@/components/Error";
import Logo from "@/components/Logo";
import { generateMnemonics } from "@/utils/walletUtilities";
import { useRouter } from "next/navigation";
import React from "react";

// formik validation
const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  confirmPass: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  termCondition: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the Terms of Service to proceed"),
});

const page = () => {
  const router = useRouter();

  return (
    <div className="container">
      <div className="">
        <Logo />
      </div>
      <h2 className="text-[18px] font-semibold text-center my-12">
        Choose a password for your wallet
      </h2>
      <Formik
        initialValues={{
          password: "",
          confirmPass: "",
          termCondition: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
          const res = generateMnemonics(values.password);
          router.push(
            `/mnemonics?mnemonics=${res}&password=${values.password}`
          );
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-6 items-center">
            <Field
              type="password"
              placeholder="Enter new password"
              className="p-3 bg-white w-[100%] rounded-lg placeholder:text-blue-950 outline-none "
              id="password"
              name="password"
            />

            {errors.password && touched.password ? (
              <Error>{errors.password}</Error>
            ) : null}

            <Field
              type="password"
              placeholder="Confirm password"
              className="p-3 bg-white w-[100%] rounded-lg placeholder:text-blue-950 outline-none "
              id="confirmPass"
              name="confirmPass"
            />

            {/* password mismatch error   */}

            {errors.confirmPass && touched.confirmPass ? (
              <Error>{errors.confirmPass}</Error>
            ) : null}

            <div className="w-[100%] text-blue cursor-pointer italic flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                className="h-4 w-4"
                id="termCondition"
                name="termCondition"
              />{" "}
              I have read all the Terms and Conditions
            </div>
            {errors.termCondition && touched.termCondition ? (
              <Error>{errors.termCondition}</Error>
            ) : null}

            <button
              type="submit"
              className=" bg-blue text-[18px] font-normal text-white w-[240px]  h-[50px] rounded-lg shadow-lg mt-12 hover:animate-pulse"
            >
              Continue
            </button>
            <span className="text-[18px] font-normal italic mt-[-10px] underline cursor-pointer">
              Cancel Process
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default page;