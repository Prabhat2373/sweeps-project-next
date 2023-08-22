// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://sweep.logiclane.tech" }),
  endpoints: (builder) => ({
    login: builder.query<any, string>({
      query: (body) => {
        return {
          url: `/adminLogin`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useLazyLoginQuery } = userApi;
