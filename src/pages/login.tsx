import React, { useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { loginValidation } from "@/validators/loginValidator";
import { useLazyLoginQuery } from "@/features/rtk/userApi";
import { useDispatch } from "react-redux";
import * as crypto from "crypto-js";
import { decodeData } from "@/utils/utils";
import { signIn } from "@/features/slices/userSlice";
const Login = () => {
  const initialValues = useMemo(() => {
    return {
      username: "testadmin",
      password: "testpass",
    };
  }, []);

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLazyLoginQuery();
  const handleSubmit = async (data: typeof initialValues) => {
    // try {
    const response = await login(data);
    // console.log();
    decodeData(response?.data).then((res) => dispatch(signIn(res?.data?.data)));

    // if (response) {
    // const encodedText = response?.data;
    // console.log("encodedText", encodedText);

    // const cryptkey = "RU5DREFUQQ";

    // const ciphertextBytes = crypto.enc.Base64.parse(encodedText);

    // const ivBytes = ciphertextBytes.words.slice(0, 4);
    // const ciphertextRaw = crypto.lib.WordArray.create(
    //   ciphertextBytes.words.slice(4)
    // );

    // const iv = crypto.lib.WordArray.create(ivBytes);
    // const key = crypto.enc.Utf8.parse(cryptkey);

    // const decrypted = crypto.AES.decrypt(
    //   { ciphertext: ciphertextRaw },
    //   cryptkey,
    //   { iv }
    // );

    // console.log("decrypted", decrypted);

    // const decryptedText = JSON.parse(decrypted.toString(crypto.enc.Utf8));

    // console.log("decryptedText", decryptedText);
    // console.log("decoded", decoded);
    // }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <img
            src="https://floatui.com/logo.svg"
            width={150}
            className="mx-auto"
            alt="Logo"
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginValidation}
        >
          {({ values }) => {
            return (
              <Form className="mt-8 space-y-5">
                <div>
                  <label htmlFor="username" className="font-medium">
                    Email
                  </label>
                  <Field
                    type="username"
                    id="username"
                    name="username"
                    placeholder="User Name"
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="font-medium">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                  {isLoading ? "Loading.." : "Sign In"}
                </button>
                <div className="text-center">
                  <a
                    href="javascript:void(0)"
                    className="hover:text-indigo-600"
                  >
                    Forgot password?
                  </a>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </main>
  );
};

export default Login;
