// Need to use the React-specific entry point to import createApi
import { getToken } from "@/utils/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sweep.logiclane.tech",
    headers: { authorization: `Bearer ${getToken()}` },
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
  }),
});

export const {
  useGetAdminMutation,
  useRevokeAdminLoginMutation,
  useLazyGetCustomerWalletQuery,
  useLazyGetRedeemsQuery,
} = mainApi;
