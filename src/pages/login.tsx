import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { loginValidation } from "@/validators/loginValidator";
import { useLazyLoginQuery } from "@/features/rtk/userApi";

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const [login, { isLoading }] = useLazyLoginQuery();
  const handleSubmit = async (data: typeof initialValues) => {
    try {
      // console.log("Login successful:", response.data);
      const response = await login(data);
      if (response) {
        console.log("response", response);
      }
    } catch (error) {
      console.error("Login error:", error.response.data);
    }
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
                  className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                  Sign in
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
