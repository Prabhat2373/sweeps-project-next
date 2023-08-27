// Need to use the React-specific entry point to import createApi
import { getToken } from "@/utils/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sweep.logiclane.tech",
    headers: {
      authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    getAdmin: builder.mutation<any, string>({
      query: (body) => {
        return {
          url: `/getAdmin`,
          method: "POST",
          body,
        };
      },
    }),
    revokeAdminLogin: builder.mutation({
      query: (body) => {
        return {
          url: "/revokeAdminLogin",
          method: "POST",
          body,
        };
      },
    }),
    getCustomerWallet: builder.query({
      query: (body) => {
        return {
          url: `/getUsers`,
          method: "POST",
          body: body,
        };
      },
    }),
    getRedeems: builder.query({
      query: (params) => ({ url: "/getRedeems", method: "POST", body: params }),
    }),
    paymnentSettings: builder.mutation({
      query: (body) => {
        return {
          url: "/paymentSettings",
          method: "POST",
          body,
        };
      },
    }),
    updatePaymentSettings: builder.mutation({
      query: (body) => {
        return {
          url: "/updatePaymentSettings",
          method: "POST",
          body,
        };
      },
    }),
    cashoutMethods: builder.mutation({
      query: (body) => {
        return {
          url: "/cashoutSettings",
          method: "POST",
          body,
        };
      },
    }),
    getGames: builder.mutation({
      query: (body) => {
        return {
          url: "/getGames",
          method: "POST",
          body,
        };
      },
    }),
    logoutAdmin: builder.mutation({
      query: (body) => {
        return {
          url: "/adminLogout",
          method: "POST",
          body,
        };
      },
    }),
   
  }),
});

export const {
  useGetAdminMutation,
  useRevokeAdminLoginMutation,
  useLazyGetCustomerWalletQuery,
  useLazyGetRedeemsQuery,
  useLogoutAdminMutation,
} = mainApi;
