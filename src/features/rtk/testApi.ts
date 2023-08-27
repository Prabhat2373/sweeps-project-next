// Need to use the React-specific entry point to import createApi
import { getToken } from "@/utils/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    // headers: {
    //   //   authorization: `Bearer ${getToken()}`,
    //   "Content-Type": "application/json",
    // },
  }),
  endpoints: (builder) => ({
    testProducts: builder.query({
      query: () => "https://dummyjson.com/products",
    }),
  }),
});

export const { useLazyTestProductsQuery, useTestProductsQuery } = testApi;
